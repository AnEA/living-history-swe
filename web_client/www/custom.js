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