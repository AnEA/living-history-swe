'use strict';

angular.module('core').controller('AddMemoryController', ['$scope', 'Global', '$modalInstance', '$filter', 'markers',
    function ($scope, Global, $modalInstance, $filter, markers) {
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

        $scope.submitForm = function () {
            if ($scope.myForm.$valid) {
                var memory = {
                    'author': Global.user.name,
                    'imageUrl': 'http://lorempixel.com/400/300/city/',
                    'content': $scope.description,
                    'tags': $scope.tags.split(','),
                    'date': $scope.myDate,
                    'active': true
                };

                _.forEach(markers, function (m) {
                    m.place.memories.push(memory);
                });

                $modalInstance.close();
            }
        };
    }
]);