'use strict';

angular.module('core').controller('SignupController', ['$scope', 'UserService', '$timeout', '$state', 'Global',
    function ($scope, UserService, $timeout, $state, Global) {
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

                Global.user = user;
                Global.authenticated = true;

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