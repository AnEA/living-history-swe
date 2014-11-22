'use strict';

angular.module('core').factory('MarkerService',
    function () {
        var observerCallbacks = [];

        this.registerObserverCallback = function (callback) {
            observerCallbacks.push(callback);
        };

        this.notifyObservers = function () {
            angular.forEach(observerCallbacks, function (callback) {
                callback();
            });
        };

        this.markers = [];
        this.filteredMarkers = [];

        return this;
    }
);