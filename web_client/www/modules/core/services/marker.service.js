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
        this.tagFilter = "";
        this.minDate = 1900;
        this.maxDate = 2015;

        return this;
    }
);