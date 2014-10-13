'use strict';

angular.module('core').controller('FilterMemoriesController', function ($scope, $modalInstance, MarkerService) {
    $scope.markers = MarkerService;

    // MarkerService.markers = [];
});