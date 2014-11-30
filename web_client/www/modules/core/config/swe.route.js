'use strict';

angular.module('swe').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'modules/core/views/home.view.html'
        })

        .state('signin', {
            url: '/signin',
            templateUrl: 'modules/core/views/signin.view.html'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'modules/core/views/signup.view.html'
        })

        .state('forgotPass', {
            url: '/forgot-password',
            templateUrl: 'modules/core/views/forgot-password.view.html'
        });
    }
]);