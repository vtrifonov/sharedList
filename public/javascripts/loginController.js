(function () {
    'use strict';

    var app = angular.module("sharedList");

    var loginController = function ($scope, $http) {
        $scope.login = function(){
            $scope.loginError = '';

            $http.post("auth", { "pass" : $scope.pass }).success(function(result){
                debugger;
                window.location = '/';
            }).error(function(result){
                debugger;
                $scope.loginError = 'Грешна парола';
            });
        }
    };

    app.controller("loginController", loginController);
})();