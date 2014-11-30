'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'UserService',
    function ($scope, UserService) {
        $scope.logout = function () {
            UserService.logout();
        };
    }
]);