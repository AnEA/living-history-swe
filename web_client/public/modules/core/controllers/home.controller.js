'use strict';

angular.module('core').controller('HomeController', ['$scope', '$log', '$modal', 'GoogleMapApi'.ns(), 'CityService',
    function ($scope, $log, $modal, GoogleMapApi, CityService) {
        $scope.map = {
            center: {
                latitude: 41.085679,
                longitude: 29.044484
            },
            zoom: 12,

        };

        GoogleMapApi.then(function () {
            CityService.getMemoriesOfCity('istanbul').then(function (places) {
                var newMarkers = [],
                    bounds = new google.maps.LatLngBounds();

                _(places).forEach(function (place, index) {
                    var location = new google.maps.LatLng(place.latitude, place.longitude),

                        marker = {
                            id: index,
                            place_id: place.place_id,
                            name: place.name,
                            latitude: place.latitude,
                            longitude: place.longitude,
                            options: {
                                visible: false
                            },
                            place: place
                        };

                    newMarkers.push(marker);
                    bounds.extend(location);
                });

                _.each(newMarkers, function (marker) {
                    marker.closeClick = function () {
                        $scope.selected.options.visible = false;
                        marker.options.visble = false;
                        return $scope.$apply();
                    };
                    marker.onClicked = function () {
                        var modalInstance = $modal.open({
                            templateUrl: 'modules/core/views/location-detail.view.html',
                            controller: 'LocationDetailController',
                            size: 'lg',
                            resolve: {
                                place: function () {
                                    return marker.place;
                                }
                            }
                        });

                        modalInstance.result.then(function (selectedItem) {
                            $scope.selected = selectedItem;
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date());
                        });
                    };
                });

                $scope.map.markers = newMarkers;
            });
        });

        angular.extend($scope, {
            selected: {
                options: {
                    visible: false

                },
                templateparameter: {}
            }
        });
    }
]);