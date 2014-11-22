'use strict';

ApplicationConfiguration.registerModule('sweDev');

angular.module('sweDev', ['swe', 'ngMockE2E']).run(function ($httpBackend) {
    function getStubResource(method, url, parameters) {
        if (parameters) {
            $log.info('parameters :' + parameters);
        }

        var data;

        jQuery.ajax({
            type: 'GET',
            url: 'stubs/' + url,
            dataType: 'json',
            success: function (response) {
                data = response;
            },
            async: false
        });

        return [200, data, {}];
    }

    $httpBackend.whenGET(/.json*/).respond(getStubResource);
    $httpBackend.whenPOST(/.json*/).respond(getStubResource);
    $httpBackend.whenDELETE(/.json*/).respond(getStubResource);

    $httpBackend.whenGET(/.html$/).passThrough();
});