'use strict';

// jshint ignore: start

angular.module('core').factory('MemoryService', ['Restangular', '$q', '$timeout',
    function (Restangular, $q, $timeout) {
        var MemoryService = {
            getAllMemories: function() {
                return Restangular.service('memory').one('get').get();
            },

            filterMemories: function(filterObject) {
                return Restangular.service('memory').one('filter').customPOST(filterObject);
            },

            addPlace: function(place) {
                return Restangular.service('place').one('add').customPOST(place);
            },

            updatePlace: function(place_id, place_name) {
                return Restangular.service('place').one('update').customPOST({
                    place_id: place_id,
                    place_name: place_name
                });
            },

            addMemory: function(memory) {
                return Restangular.service('memory').one('create').customPOST(memory);
            }
        };

        return MemoryService;
    }
]);