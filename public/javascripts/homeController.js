(function () {
    'use strict';

    var app = angular.module("sharedList");

    var homeController = function ($scope, itemsService) {

        $scope.items = itemsService.getItems();

        $scope.testButtonTitle = 'Test 123'

        $scope.selected = undefined;

        $scope.states = itemsService.getDistinctItems();
    };

    app.controller("homeController", homeController);
})();