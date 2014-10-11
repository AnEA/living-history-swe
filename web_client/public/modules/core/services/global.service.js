'use strict';

//Global service for global variables
angular.module('core').factory('Global', [

    function () {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: !!window.user,
            countdown: 10
        };

        return _this._data;
    }
]);