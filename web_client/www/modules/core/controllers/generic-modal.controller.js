'use strict';

angular.module('core').controller('GenericModalController', ['$scope', '$modalInstance', '$state', 'modalData',
    function ($scope, $modalInstance, $state, modalData) {
        $scope.modalData = modalData;

        $scope.cancel = function ()  {
            $modalInstance.dismiss('cancel');
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.success = function () {
            $state.go(modalData.goOnSuccess);
        };
    }
]);