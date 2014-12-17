'use strict';

// jshint ignore:start

angular.module('core').factory('UserService', ['Restangular', 'Global', '$q', '$timeout',
    function (Restangular, Global, $q, $timeout) {

        var UserService = {
            login: function (email, password) {
                return Restangular.service('user').one('get').get({
                    "email": email,
                    "password": password
                });
            },

            reset: function (email) {
                var deferred = $q.defer();

                $timeout(function () {
                    if (email === 'test@test.com') {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                }, 500);

                return deferred.promise;
            },

            register: function (user) {
                var deferred = $q.defer();

                $timeout(function () {
                    Global.user = user;
                    Global.authenticated = true;
                    deferred.resolve();
                }, 500);

                return deferred.promise;
            },

            logout: function () {
                Global.user = null;
                Global.authenticated = false;
            }
        };

        return UserService;
    }
]);