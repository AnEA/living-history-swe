'use strict';

/* exported ApplicationConfiguration */

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
    // Init module configuration options
    var applicationModuleName = 'swe';
    var applicationModuleVendorDependencies = ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.router', 'restangular', 'google-maps'.ns(), 'ui-rangeSlider', 'angularMoment', 'xeditable'];

    // Add a new vertical module
    var registerModule = function (moduleName) {
        // Create angular module
        angular.module(moduleName, []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();