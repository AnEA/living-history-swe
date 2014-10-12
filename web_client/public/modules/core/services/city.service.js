'use strict';

angular.module('core').factory('CityService', ['Restangular',
    function (Restangular) {

        var CityService = {
            getMemoriesOfCity: function (city) {
            return Restangular.service('cities').one(city + '.json').getList();
            }
        };

        return CityService;
    }
]);