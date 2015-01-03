'use strict';

angular.module('core').controller('FilterMemoriesController', ['$scope', 'MarkerService', '$filter', '$log', 'MemoryService', '$modal',
    function ($scope, MarkerService, $filter, $log, MemoryService, $modal) {
        $scope.hashtag = MarkerService.tagFilter;

        $scope.range = {
            min: MarkerService.minDate,
            max: MarkerService.maxDate
        };

        $scope.applyFilter = function () {
            /*
            $log.info('filter ipnut ' + MarkerService.markers.length);

            var temp = $filter('dateFilter')(MarkerService.markers, new Date($scope.range.min + ''), new Date($scope.range.max + ''));

            $log.info('after dateFilter ' + temp.length);

            MarkerService.filteredMarkers = $filter('filterByTag')(temp, $scope.hashtag);
            MarkerService.maxDate = $scope.range.max;
            MarkerService.minDate = $scope.range.min;
            MarkerService.tagFilter = $scope.hashtag;

            $log.info('filter output ' + MarkerService.filteredMarkers.length);
            */

            function showNoMemoryError() {
                var _modalData = {
                    message: 'No related memory has been found!'
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

            MemoryService.filterMemories({
                minDate: $scope.range.min,
                maxDate: $scope.range.max,
                search: $scope.hashtag
            }).then(function(markers) {
                var memories = markers.memories;
                if (memories !== 'No data Available') {
                    MarkerService.filteredMarkers = memories;
                    MarkerService.notifyObservers();
                } else {
                    showNoMemoryError();
                }
            }, function() {
                showNoMemoryError();
            });
        };
    }
]);