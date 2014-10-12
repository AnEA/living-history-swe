'use strict';

angular.module('core').controller('LocationDetailController', ['$scope', '$modalInstance', 'place',
    function ($scope, $modalInstance, place) {
        $scope.place = place;
        $scope.memories = place.memories;

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