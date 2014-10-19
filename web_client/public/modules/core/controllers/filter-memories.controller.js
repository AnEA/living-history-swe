'use strict';

angular.module('core').controller('FilterMemoriesController', ['$scope', 'MarkerService', '$filter', '$log',
    function ($scope, MarkerService, $filter, $log) {
        $scope.hashtag = '';

        $scope.range = {
            min: 1900,
            max: 2014
        };

        $scope.applyFilter = function () {
            $log.info('filter ipnut ' + MarkerService.markers.length);
            MarkerService.filteredMarkers = $filter('filterByTag')(MarkerService.markers, $scope.hashtag);
            $log.info('filter output ' + MarkerService.filteredMarkers.length);
            MarkerService.notifyObservers();
        };
    }
]);