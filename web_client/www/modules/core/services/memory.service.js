'use strict';

// jshint ignore: start

angular.module('core').factory('MemoryService', ['Restangular', '$q', '$timeout',
    function (Restangular, $q, $timeout) {
        var MemoryService = {
            getAllMemories: function() {
                return Restangular.service('memory').one('get').get();
            },

            addPlace: function(place) {
                return Restangular.service('place').one('add').customPOST(place);
            },

            addMemory: function(memory) {
                return Restangular.service('memory').one('create').customPOST(memory);
            }
        };

        return MemoryService;
    }
]);