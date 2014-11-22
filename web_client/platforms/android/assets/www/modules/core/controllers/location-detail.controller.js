'use strict';

angular.module('core').controller('LocationDetailController', ['$scope', '$modalInstance', 'placeName', 'memories',
    function ($scope, $modalInstance, placeName, memories) {
        $scope.placeName = placeName;
        $scope.memories = memories;

        $scope.tagLabels = ['label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger'];

        $scope.currentPage = 1;
        $scope.currentMemory = $scope.memories[0];

        $scope.pageChanged = function () {
            $scope.currentMemory = $scope.memories[$scope.currentPage - 1];
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);