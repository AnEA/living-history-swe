'use strict';

angular.module('core').config(['RestangularProvider',
    function (RestangularProvider) {

        RestangularProvider.setResponseExtractor(function (response) {
            var newResponse = response;
            if (angular.isArray(response)) {
                angular.forEach(newResponse, function (value, key) {
                    newResponse[key].originalElement = angular.copy(value);
                });
            } else {
                newResponse.originalElement = angular.copy(response);
            }
            return newResponse;
        });
    }
]);