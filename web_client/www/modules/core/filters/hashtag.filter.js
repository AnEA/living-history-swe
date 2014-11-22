'use strict';

angular.module('core').filter('filterByTag', function () {
    return function (markers, tag) {
        return (markers ||  []).filter(function (marker) {
            var markerExist = false;

            _(marker.place.memories).forEach(function (memory) {
                if (tag.length === 0 || memory.tags.indexOf(tag) > -1) {
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