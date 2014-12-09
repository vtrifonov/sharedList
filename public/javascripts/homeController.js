(function () {
    'use strict';

    var app = angular.module("sharedList");

    var homeController = function ($scope, $modal, itemsService) {

        itemsService.getDistinctItems(function (response) {
            $scope.names = response.data;
        });

        $scope.selectItem = function (item)
        {
            $scope.selectedItem = item;
        };

        $scope.newItem = function(){
            addNewItem().then(function(result){
                itemsService.addItem({
                    date: result.data
                }).then(getItems(true));
            });
        };

        $scope.deleteDate = function(item){
            if(confirm('Сигурен ли си че искаш да изтриеш желаното дерби?')) {
                itemsService.deleteDate(item).then(function (result) {
                    getItems(true);
                });
            }
        };

        var addNewItem = function(){
            var modalInstance = $modal.open({
                templateUrl: 'views/modal.html',
                controller: "modalController",

                resolve: {
                    settings: function () {
                        return {
                            header: 'Ново Дерби:'
                        };
                    }
                }
            });

            return modalInstance.result;
        };

        var getItems = function(selectFirst){
            itemsService.getItems(function(response){
                $scope.items = response.data;
                if($scope.items.length > 0 && selectFirst)
                {
                    $scope.selectedItem = $scope.items[0];
                }
            });
        };

        getItems(true);
    };

    app.controller("homeController", homeController);
})();