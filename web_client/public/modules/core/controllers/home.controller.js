'use strict';

angular.module('core').controller('HomeController', ['$scope', '$log', '$timeout', '$modal', 'GoogleMapApi'.ns(), 'CityService', 'MarkerService',
    function ($scope, $log, $timeout, $modal, GoogleMapApi, CityService, MarkerService) {
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
                                    addNewMarker(e.latLng.lat(), e.latLng.lng(), results[0].address_components[0].short_name);
                                } else {
                                    $log.info('No results found');
                                }
                            } else {
                                $log.info('Geocoder failed due to: ' + status);
                            }
                        });
                    }
                }
            },
        };

        $scope.filterIsOpen = false;

        function addNewMarker(lat, lng, name) {
            var clickedMarker = {
                id: 0,
                place: {
                    name: name,
                    memories: []
                },
                latitude: lat,
                longitude: lng,
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
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        GoogleMapApi.then(function () {
            geocoder = new google.maps.Geocoder();

            CityService.getMemoriesOfCity('istanbul').then(function (places) {
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

                        var bounds = new google.maps.LatLngBounds();
                        bounds.extend(places[0].geometry.location);
                        addNewMarker(places[0].geometry.location.lat(),
                            places[0].geometry.location.lng(), places[0].name);

                        setMapBounds(bounds);
                    }
                }
            }
        });
    }
]);