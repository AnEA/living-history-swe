'use strict';

// close modals on route change
angular.module('core').run(['$rootScope', '$modalStack',
    function ($rootScope, $modalStack) {
        $rootScope.$on('$stateChangeSuccess', function (newVal, oldVal) {
            if (oldVal !== newVal) {
                $modalStack.dismissAll();
            }
        });
    }
])

.run(['$rootScope', 'Global',
    function ($rootScope, Global) {
        $rootScope.global = Global;
    }
]);