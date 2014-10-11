'use strict';

ApplicationConfiguration.registerModule('sweDev');

angular.module('sweDev', ['swe', 'ngMockE2E']).run(function ($httpBackend) {
    // returns the question using it's index parameter
    $httpBackend.whenGET(/.json$/).respond(function (method, url) {
        // var id = parseInt(url.split('/')[1], 10);
        var request = new XMLHttpRequest();

        request.open('GET', 'responses' + url, false);
        request.send(null);

        return [request.status, request.response, {}];
    });

    $httpBackend.whenGET(/.html$/).passThrough();
});