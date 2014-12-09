(function () {
    'use strict';

    var app = angular.module("sharedList");

    var homeController = function ($scope, itemsService) {

        $scope.items = itemsService.getItems();

        $scope.testButtonTitle = 'Test 123'
    };

    app.controller("homeController", homeController);
})();