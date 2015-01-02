'use strict';

angular.module('core').controller('LocationDetailController', ['$scope', '$modalInstance', 'placeName', 'memories', 'ResponseService', '$timeout', 'Global', '$modal',
    function ($scope, $modalInstance, placeName, memories, ResponseService, $timeout, Global, $modal) {
        $scope.placeName = placeName;
        $scope.memories = memories;
        $scope.responses = ResponseService.responses;
        $scope.memoryResponses = [];

        function getMemoryResponses() {
            ResponseService.getResponses($scope.currentMemory.memoryId).then(function(memoryResponses) {
                _.forEach(memoryResponses, function(m) {
                    m.responseText = $scope.responses[m.responseId];
                });
                $scope.memoryResponses = memoryResponses;
            });
        }

        $scope.tagLabels = ['label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger'];

        $scope.currentPage = 1;
        $scope.currentMemory = $scope.memories[0];
        getMemoryResponses();

        $scope.pageChanged = function () {
            $scope.currentMemory = $scope.memories[$scope.currentPage - 1];
            getMemoryResponses();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.sendResponse = function(index) {
            if (Global.authenticated) {
                ResponseService.sendResponse(index, $scope.currentMemory.memoryId).then(function() {
                    $scope.memoryResponses.push({
                        sender: Global.user ? Global.user.name : 'New User',
                        responseText: $scope.responses[index],
                        date: new Date().getTime()
                    });

                    $timeout(function() {
                        $scope.status.rightDropdownOpen = true;
                    }, 300);
                });
            } else {
                var _modalData = {
                    message: 'You need to login first!',
                    goOnSuccess: 'signin'
                };

                $modal.open({
                    templateUrl: 'modules/core/views/error-modal.view.html',
                    controller: 'GenericModalController',
                    size: 'sm',
                    resolve: {
                        modalData: function () {
                            return _modalData;
                        }
                    }
                });
            }
        };
    }
]);