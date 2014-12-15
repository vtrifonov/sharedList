(function(){
    'use strict';

    var app = angular.module('sharedList', ['ngRoute', 'ui.bootstrap', 'ngLodash']);

    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html",
                controller: "homeController",
                name: "Home"
            })
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "loginController",
                name: "Login"
            })
            .otherwise({ redirectTo: "/" });

        $locationProvider.html5Mode(true);
    });
})();