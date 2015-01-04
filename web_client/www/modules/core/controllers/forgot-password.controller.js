'use strict';

angular.module('core').controller('ForgotPasswordController', ['$scope', 'UserService',
    function ($scope, UserService) {
        $scope.reset = function () {
            UserService.reset($scope.email).then(function (res) {
                if (res.success) {
                    $scope.alerts = [{
                        type: 'success',
                        msg: 'Your new password is sent to your email!'
                    }];
                } else {
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'There is not any registered user with this email!'
                    }];
                }
                $scope.email = '';
            });
        };

        $scope.alerts = [];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    }
]);