'use strict';

angular.module('core').controller('HomeController', ['$scope', 'GoogleMapApi'.ns(),
    function ($scope, GoogleMapApi) {
        $scope.map = {
            center: {
                latitude: 41.038954,
                longitude: 28.987260
            },
            zoom: 12
        };

        GoogleMapApi.then(function () {

        });
    }
]);