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
                return Restangular.service('user').one('reset').customPOST({
                    "email": email
                });
            },

            register: function (user) {
                return Restangular.service('user').one('create').customPOST(user);
            },

            logout: function () {
                Global.user = null;
                Global.authenticated = false;
            }
        };

        return UserService;
    }
]);