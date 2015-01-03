'use strict';

// jshint ignore:start

angular.module('core').factory('ResponseService', ['Restangular', 'Global',
    function (Restangular, Global) {

        var ResponseService = {
            responses: ['Really Good', 'I did the same thing', 'Interesting', 'I liked this'],

            sendResponse: function(responseId, memoryId) {
                return Restangular.service('memory').one('response').customPOST({
                    responseId: responseId,
                    memoryId: memoryId,
                    user: Global.user ? Global.user.email : 'test',
                    date: new Date().getTime()
                });
            },

            getResponses: function(memoryId) {
                return Restangular.service('memory').one('getResponse').customPOST({
                    memoryId: memoryId
                });
            }
        };

        return ResponseService;
    }
]);