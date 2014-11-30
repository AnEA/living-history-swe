'use strict';

// jshint ignore:start

angular.module('core').factory('UserService', ['Restangular', 'Global', '$q', '$timeout',
    function (Restangular, Global, $q, $timeout) {

        var user = {
            'name': 'Test User'
        };

        var UserService = {
            login: function (email, password) {
                var deferred = $q.defer();

                $timeout(function () {
                    if (true) {
                        Global.user = user;
                        deferred.resolve(user);
                    } else {
                        deferred.reject();
                    }
                }, 500);

                return deferred.promise;
            },

            logout: function () {
                Global.user = null;
            }
        };

        return UserService;
    }
]);