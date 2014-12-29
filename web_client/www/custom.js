'use strict';

angular.module('swe').directive('openMenu', function() {
    return {
        link: function(scope, element) {
            element.on('click', function() {
                $('#left_menu').toggle();
            });
        }
    };
});

angular.module('swe').config(['RestangularProvider',
    function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://private-69827-swelivinghistory.apiary-mock.com/LivingHistoryRestService/rest');
    }
]);

String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};