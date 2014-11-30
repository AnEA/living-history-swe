'use strict';

angular.module('core').controller('SigninController', ['$scope', 'UserService', '$timeout', '$state',
    function ($scope, UserService, $timeout, $state) {
        $scope.signin = function () {
            UserService.login($scope.email, $scope.password).then(function () {
                $scope.alerts = [{
                    type: 'success',
                    msg: 'Login Success! You are being redirected to homepage!'
                }];

                $timeout(function () {
                    $state.go('home');
                }, 1000);
            }, function () {
                $scope.alerts = [{
                    type: 'danger',
                    msg: 'Incorrect Username or Password!'
                }];
            });
        };

        $scope.alerts = [];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    }
]);