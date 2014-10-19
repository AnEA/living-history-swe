'use strict';

angular.module('core').controller('HomeController', ['$scope', '$log', '$timeout', '$modal', 'GoogleMapApi'.ns(), 'CityService', 'MarkerService',
    function ($scope, $log, $timeout, $modal, GoogleMapApi, CityService, MarkerService) {
        var modalInstance,
            isModelOpened = false;

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

        MarkerService.registerObserverCallback(function () {
            $log.info('filteredMarkers new val ' + MarkerService.filteredMarkers);
            $scope.activeMarkers = MarkerService.filteredMarkers;
        });

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
            });
        });

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
                        for (var i = 0; i < places.length; i++) {
                            bounds.extend(places[i].geometry.location);
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
                }
            }
        });
    }
]);