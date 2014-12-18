'use strict';

angular.module('core').filter('dateFilter', function () {
    return function (markers, minDate, maxDate) {
        return (markers ||  []).filter(function (marker) {
            var markerExist = false;

            _(marker.place.memories).forEach(function (memory) {
                var d = new Date(memory.date);

                if (d >= minDate && d <= maxDate) {
                    memory.active = true;
                    markerExist = true;
                } else {
                    memory.active = false;
                }
            });

            return markerExist;
        });
    };
});