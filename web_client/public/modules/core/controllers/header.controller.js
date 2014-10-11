'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;
    }
]);