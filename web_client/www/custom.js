'use strict';

angular.module('swe').directive('openMenu', function() {
    return {
        link: function(scope, element) {
            element.on('click', function() {
                $('#left_menu').toggle();
            });
        }
    };
})

.directive('loader', function () {
    return function ($scope, element) {
        $scope.$on('loader_show', function () {
            return element.css('display', 'block');
        });
        return $scope.$on('loader_hide', function () {
            return element.css('display', 'none');
        });
    };
})

.config(['$httpProvider',
    function ($httpProvider) {
        // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(['$q', '$rootScope',
            function ($q, $rootScope) {
                var numLoadings = 0;
                return {
                    request: function (config) {

                        numLoadings++;

                        // Show loader
                        $rootScope.$broadcast('loader_show');
                        return config || $q.when(config);

                    },
                    responseError: function (rejection) {

                        if ((--numLoadings) === 0) {
                            // Hide loader
                            $rootScope.$broadcast('loader_hide');
                        }

                        return $q.reject(rejection);
                    },
                    // optional method
                    response: function (response) {
                        // do something on success
                        if ((--numLoadings) === 0) {
                            // Hide loader
                            $rootScope.$broadcast('loader_hide');
                        }
                        return response;
                    }

                };
            }
        ]);
    }
]);

angular.module('swe').config(['RestangularProvider',
    function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://ec2-54-72-10-88.eu-west-1.compute.amazonaws.com:8080/LivingHistoryRestService/rest');
    }
]);

String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};