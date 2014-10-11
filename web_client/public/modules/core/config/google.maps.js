'use strict';

//'GoogleMapApiProvider'.ns() == 'uiGmapGoogleMapApiProvider'
angular.module('swe').config(['GoogleMapApiProvider'.ns(),
    function (GoogleMapApi) {
        GoogleMapApi.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }
]);