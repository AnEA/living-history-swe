'use strict';

angular.module('core').controller('HomeController', ['$scope', '$log', '$timeout', '$modal', 'GoogleMapApi'.ns(), 'CityService', 'MarkerService',
    function ($scope, $log, $timeout, $modal, GoogleMapApi, CityService, MarkerService) {
        var modalInstance,
            isModelOpened = false,
            eventsInited = false,
            drawedMarkers = [];

        $scope.map = {
            control: {},
            center: {
                latitude: 41.085679,
                longitude: 29.044484
            },
            zoom: 12,
            bounds: null
        };

        $scope.filterIsOpen = false;

        $scope.drawingManagerControl = {};

        function initDrawEvents() {
            if (eventsInited) {
                return;
            }

            eventsInited = true;
            google.maps.event.addListener($scope.drawingManagerControl.getDrawingManager(), 'markercomplete', function (drawed) {
                // var location = new google.maps.LatLng(map.position, place.longitude);
                // map.getPosition().lat()
                // map.getPosition().lng()
                drawedMarkers.push(drawed);

                $log.info('finished ' + drawed.position);
            });
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
        });

        $scope.addMemory = function () {
            initDrawEvents();

            $scope.isAdding = true;
            $scope.activeMarkers = [];
            $scope.drawingManagerOptions.drawingMode = google.maps.drawing.OverlayType.MARKER;
        };

        $scope.cancelAdding = function () {
            _.forEach(drawedMarkers, function (drawed) {
                drawed.setMap();
            });
            drawedMarkers = [];

            $scope.isAdding = false;
            $scope.activeMarkers = MarkerService.markers;
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

        $scope.markerSelected = function (marker) {
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

        GoogleMapApi.then(function () {
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
                var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.1, bounds.getNorthEast().lng() + 0.1),
                    extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.1, bounds.getNorthEast().lng() - 0.1);

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
            drawingManagerOptions: {
                drawingControl: false
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
                        for (var i = 0; i < places.length; i++) {
                            bounds.extend(places[i].geometry.location);
                        }

                        setMapBounds(bounds);
                    }
                }
            }
        });
    }
]);