(function(){
    'use strict';

    var app = angular.module('sharedList', ['ngRoute', 'ui.bootstrap']);

    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html",
                controller: "homeController",
                name: "Home"
            })
            .otherwise({ redirectTo: "/" });

        $locationProvider.html5Mode(true);
    });
})();