'use strict';

angular.module('core').controller('AddMemoryController', ['$scope', 'Global', '$modalInstance', '$filter', 'markers', 'MemoryService', '$upload',
    function ($scope, Global, $modalInstance, $filter, markers, MemoryService, $upload) {
        var image_url = '';

        $scope.modes = [{
            name: 'Year',
            mode: 'year',
            format: 'yyyy',
            options: {
                minMode: 'year'
            },
            showTime: false
        }, {
            name: 'Month',
            mode: 'month',
            format: 'yyyy/MM',
            options: {
                minMode: 'month'
            },
            showTime: false
        }, {
            name: 'Day',
            mode: 'day',
            format: 'yyyy/MM/dd',
            options: {
                minMode: 'day'
            },
            showTime: true
        }];

        $scope.maxDate = new Date();

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.modeSelected = function (mode) {
            _.forEach($scope.modes, function (m) {
                m.selected = false;
                m.opened = false;
            });

            mode.selected = true;

            $scope.showTime = mode.showTime;

            var datefilter = $filter('date');

            $scope.myDate = datefilter($scope.myDate, mode.format);
        };
        $scope.modeSelected($scope.modes[0]);

        $scope.open = function (mode, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            mode.opened = true;
        };

        $scope.fileChanged = function(file) {
            $upload.upload({
                url : 'https://api.cloudinary.com/v1_1/dpkxwyqys/image/upload',
                method : 'POST',
                data : {
                    upload_preset: 'z3ahn15i',
                    api_key: '895281872653216',
                    timestamp: new Date().getTime(),
                    key : 'test1',
                    "Content-Type" : file.type === null || file.type === '' ? 'application/octet-stream' : file.type,
                    filename : file.name
                },
                file : file
            }).success(function(data) {
                image_url = data.url;
            });
        };

        $scope.submitForm = function () {
            if ($scope.myForm.$valid) {
                var memory = {
                    'author': Global.user.name,
                    'title': $scope.title,
                    'email': Global.user.email,
                    'imageUrl': image_url,
                    'content': $scope.description,
                    'tags': $scope.tags.split(','),
                    'date': $scope.myDate,
                    'active': true,
                    places: []
                };

                _.forEach(markers, function (m) {
                    m.place.memories.push(memory);
                    memory.places.push(m.place_id);
                });

                MemoryService.addMemory(memory).then(function() {
                    $modalInstance.close();
                });
            }
        };
    }
]);