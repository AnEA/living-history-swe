'use strict';

//'GoogleMapApiProvider'.ns() == 'uiGmapGoogleMapApiProvider'
angular.module('swe').config(['GoogleMapApiProvider'.ns(),
    function (GoogleMapApi) {
        GoogleMapApi.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'places,drawing'
        });
    }
]);

angular.module('core').run(['$templateCache',
    function ($templateCache) {
        $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search Box">');
    }
]);

angular.module('core').run(['$rootScope', 'Global',
    function ($rootScope, Global) {
        $rootScope.global = Global;
    }
]);