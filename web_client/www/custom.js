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
        RestangularProvider.setBaseUrl('http://ec2-54-72-10-88.eu-west-1.compute.amazonaws.com:8080/LivingHistoryRestService/rest');
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