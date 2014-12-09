(function () {
    'use strict';

    var app = angular.module("sharedList");

    var modalController = function ($scope, $modalInstance, settings) {
        $scope.header = settings.header;
        $scope.resultText = settings.defaultMessage;

        $scope.ok = function (text) {
            $modalInstance.close(
                {
                    success: true,
                    data: text
                });
        };

        $scope.cancel = function () {
            $modalInstance.close(
                {
                    success: false
                });
        };
    };

    app.controller("modalController", modalController);

})();