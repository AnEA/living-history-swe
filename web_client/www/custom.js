angular.module('swe').directive('openMenu', function() {
    return {
        link: function(scope, element) {
            element.on('click', function() {
                $("#left_menu").toggle();
            });
        }
    };
});