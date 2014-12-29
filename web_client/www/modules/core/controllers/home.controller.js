'use strict';

angular.module('core').controller('HomeController', ['$scope', '$log', '$timeout', '$modal', 'GoogleMapApi'.ns(), 'MemoryService', 'MarkerService', 'Global', '$filter',
    function ($scope, $log, $timeout, $modal, GoogleMapApi, MemoryService, MarkerService, Global, $filter) {
        var modalInstance,
            isModelOpened = false,
            geocoder;

        $scope.selectedToAdd = 0;

        $scope.alerts = [];

        $scope.map = {
            options: {
                styles: [{
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{
                        visibility: 'off'
                    }]
                }]
            },
            control: {},
            center: {
                latitude: 41.085679,
                longitude: 29.044484
            },
            zoom: 12,
            bounds: null,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    if ($scope.isAddingLocation) {
                        var e = originalEventArgs[0];

                        geocoder.geocode({
                            'latLng': e.latLng
                        }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    $log.info('result: ' + results[0].address_components[0].short_name);
                                    addNewMarker(e.latLng.lat(), e.latLng.lng(), results[0].address_components[0].short_name,
                                        e.latLng.toString().hashCode(), true);
                                } else {
                                    $log.info('No results found');
                                }
                            } else {
                                $log.info('Geocoder failed due to: ' + status);
                            }
                        });
                    }
                }
            }
        };

        $scope.filterIsOpen = false;

        function addNewMarker(lat, lng, name, place_id, _isEditable) {
            var clickedMarker = {
                id: place_id,
                place_id: place_id,
                place: {
                    name: name,
                    memories: []
                },
                latitude: lat,
                longitude: lng,
                isEditable: _isEditable,
                isCustom: true
            };

            $scope.activeMarkers.push(clickedMarker);
            $scope.$apply();
        }

        MarkerService.registerObserverCallback(function () {
            $log.info('filteredMarkers new val ' + MarkerService.filteredMarkers);
            $scope.activeMarkers = MarkerService.filteredMarkers;

            var bounds = new google.maps.LatLngBounds();
            _.forEach(MarkerService.filteredMarkers, function (marker) {
                var location = new google.maps.LatLng(marker.latitude, marker.longitude);
                bounds.extend(location);
            });
            setMapBounds(bounds);

            refreshMarkers();
        });

        $scope.removeMarker = function (index) {
            $scope.activeMarkers.splice(index, 1);
            refreshMarkers();
        };

        function refreshMarkers() {
            _.forEach($scope.activeMarkers, function (m) {
                m.refresh = true;
            });
        }

        $scope.selectThumb = function (marker) {
            marker.isActive = !marker.isActive;
            $scope.selectedToAdd += marker.isActive ? 1 : -1;
        };

        $scope.openFilterModal = function () {
            if (isModelOpened) {
                modalInstance.dismiss('cancel');
            } else {
                modalInstance = $modal.open({
                    templateUrl: 'modules/core/views/memory-filters.view.html',
                    controller: 'FilterMemoriesController',
                    size: 'sm',
                    windowClass: 'filter_modal'
                });
            }

            isModelOpened = !isModelOpened;
        };

        $scope.goToMarker = function (marker) {
            var latLng = new google.maps.LatLng(marker.latitude, marker.longitude),
                bounds = new google.maps.LatLngBounds(latLng);

            setMapBounds(bounds);
        };

        $scope.markerSelected = function (marker) {
            if (!marker.place.memories.length) {
                return;
            }

            var activeMemories = _.filter(marker.place.memories, function (memory) {
                return memory.active;
            });

            $modal.open({
                windowClass: 'memory_modal',
                templateUrl: 'modules/core/views/location-detail.view.html',
                controller: 'LocationDetailController',
                size: 'lg',
                resolve: {
                    placeName: function () {
                        return marker.place.name;
                    },

                    memories: function () {
                        return activeMemories;
                    }
                }
            });
        };

        $scope.addMemory = function () {
            if (Global.authenticated) {
                var selectedMarkers = _.filter($scope.activeMarkers, 'isActive');

                var modalInstance = $modal.open({
                    templateUrl: 'modules/core/views/add-memory.view.html',
                    controller: 'AddMemoryController',
                    size: 'lg',
                    resolve: {
                        markers: function () {
                            return selectedMarkers;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    $scope.alerts.push({
                        type: 'success',
                        msg: 'Your memory is successfully created!'
                    });
                });
            } else {
                var _modalData = {
                    message: 'You need to login first!',
                    goOnSuccess: 'signin'
                };

                $modal.open({
                    templateUrl: 'modules/core/views/error-modal.view.html',
                    controller: 'GenericModalController',
                    size: 'sm',
                    resolve: {
                        modalData: function () {
                            return _modalData;
                        }
                    }
                });
            }
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        GoogleMapApi.then(function () {
            geocoder = new google.maps.Geocoder();

            MemoryService.getAllMemories().then(function (places) {
                var bounds = new google.maps.LatLngBounds(),
                    newMarkers = [];

                _(places).forEach(function (place) {
                    var location = new google.maps.LatLng(place.latitude, place.longitude),

                        marker = {
                            id: place.place_id,
                            place_id: place.place_id,
                            name: place.name,
                            latitude: place.latitude,
                            longitude: place.longitude,
                            options: {
                                visible: false
                            },
                            place: place,
                            destroy: function () {
                                $log.info('destroy is called');
                            }
                        };

                    newMarkers.push(marker);
                    bounds.extend(location);
                });

                newMarkers = $filter('filterByTag')(newMarkers, '');
                $scope.activeMarkers = newMarkers;
                MarkerService.markers = newMarkers;

                setMapBounds(bounds);
            });
        });

        function setMapBounds(bounds) {
            if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
                var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01),
                    extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);

                bounds.extend(extendPoint1);
                bounds.extend(extendPoint2);
            }

            $scope.map.bounds = {
                northeast: {
                    latitude: bounds.getNorthEast().lat(),
                    longitude: bounds.getNorthEast().lng()
                },
                southwest: {
                    latitude: bounds.getSouthWest().lat(),
                    longitude: bounds.getSouthWest().lng()
                }
            };
        }

        angular.extend($scope, {
            selected: {
                options: {
                    visible: false

                },
                templateparameter: {}
            },
            searchbox: {
                template: 'searchbox.tpl.html',
                events: {
                    places_changed: function (searchBox) {
                        $log.info('place changed');

                        var places = searchBox.getPlaces();
                        if (places.length === 0) {
                            return;
                        }

                        var place = places[0];
                        var bounds = new google.maps.LatLngBounds();
                        bounds.extend(place.geometry.location);
                        addNewMarker(place.geometry.location.lat(),
                            place.geometry.location.lng(), place.name, place.id, false);

                        setMapBounds(bounds);

                        MemoryService.addPlace({
                            "place_name": place.name,
                            "place_id": place.place_id,
                            "latitude": place.geometry.location.lat(),
                            "longitude": place.geometry.location.lng()
                        });
                    }
                }
            }
        });
    }
]);