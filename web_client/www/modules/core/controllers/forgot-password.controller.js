'use strict';

angular.module('core').controller('ForgotPasswordController', ['$scope', 'UserService',
    function ($scope, UserService) {
        $scope.reset = function () {
            UserService.reset($scope.email).then(function () {
                $scope.alerts = [{
                    type: 'success',
                    msg: 'Reset instructions are sent to your email!'
                }];
                $scope.email = '';
            }, function () {
                $scope.alerts = [{
                    type: 'danger',
                    msg: 'There is not any registered user with this email!'
                }];
                $scope.email = '';
            });
        };

        $scope.alerts = [];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    }
]);