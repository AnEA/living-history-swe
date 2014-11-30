'use strict';

angular.module('core').controller('SignupController', ['$scope', 'UserService', '$timeout', '$state',
    function ($scope, UserService, $timeout, $state) {
        $scope.signup = function () {
            var user = {
                'email': $scope.email,
                'name': $scope.fullName,
                'password': $scope.password
            };

            UserService.register(user).then(function () {
                $scope.alerts = [{
                    type: 'success',
                    msg: 'You are successfully registered! You are being redirected to homepage!'
                }];

                $timeout(function () {
                    $state.go('home');
                }, 2000);
            });
        };

        $scope.alerts = [];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    }
]);