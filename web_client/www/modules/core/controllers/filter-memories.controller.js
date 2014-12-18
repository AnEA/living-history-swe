'use strict';

angular.module('core').controller('FilterMemoriesController', ['$scope', 'MarkerService', '$filter', '$log',
    function ($scope, MarkerService, $filter, $log) {
        $scope.hashtag = MarkerService.tagFilter;

        $scope.range = {
            min: MarkerService.minDate,
            max: MarkerService.maxDate
        };

        $scope.applyFilter = function () {
            $log.info('filter ipnut ' + MarkerService.markers.length);

            var temp = $filter('dateFilter')(MarkerService.markers, new Date($scope.range.min + ''), new Date($scope.range.max + ''));

            $log.info('after dateFilter ' + temp.length);

            MarkerService.filteredMarkers = $filter('filterByTag')(temp, $scope.hashtag);
            MarkerService.maxDate = $scope.range.max;
            MarkerService.minDate = $scope.range.min;
            MarkerService.tagFilter = $scope.hashtag;

            $log.info('filter output ' + MarkerService.filteredMarkers.length);
            MarkerService.notifyObservers();
        };
    }
]);