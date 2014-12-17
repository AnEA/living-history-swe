'use strict';

// jshint ignore: start

angular.module('core').factory('MemoryService', ['Restangular', '$q', '$timeout',
    function (Restangular, $q, $timeout) {
        var MemoryService = {
            getAllMemories: function() {
                return Restangular.service('memory').one('get').get();
            }
        };

        return MemoryService;
    }
]);