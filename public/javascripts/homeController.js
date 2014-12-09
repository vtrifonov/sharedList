(function () {
    'use strict';

    var app = angular.module("sharedList");

    var homeController = function ($scope, $modal, itemsService) {

        $scope.persionName = undefined;

        $scope.selectItem = function (item)
        {
            $scope.selectedItem = item;
        };

        $scope.selectPerson = function(person)
        {
            $scope.selectedPerson = person;
        }

        $scope.newItem = function(){
            addNewItem().then(function(result){
                itemsService.addItem({
                    date: result.data
                }).then(getItems(true));
            });
        };

        $scope.deleteDate = function(item){
            if(confirm('Сигурен ли си че искаш да изтриеш избраното дерби - ' + item + '?')) {
                itemsService.deleteDate(item).then(function (result) {
                    getItems(true);
                });
            }
        };

        $scope.deletePerson = function(person){
            if(confirm('Сигурен ли си че искаш да изтриеш ' + person.name + ' от списъка за ' + $scope.selectedItem.date + '?')) {
                itemsService.deleteItem({date: $scope.selectedItem.date, name: person.name }).then(function (result) {
                    getItems(true);
                });
            }
        };

        $scope.newPerson = function(name){
            var newItem = {
                date: $scope.selectedItem.date,
                item:{
                    name: name
                }
            };

            itemsService.addItem(newItem).success(function(data, status, headers, config){
                $scope.selectedItem.items.push({
                    name: name
                });
                $scope.persionName = undefined;
                loadDistinctNames();
            }).error(function (data, status, headers, config)
            {
                if(status == 409){
                    alert(name + ' вече е записан!');
                }
                else{
                    alert(data);
                }
            })
        }

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

        var loadDistinctNames = function(){
            itemsService.getDistinctItems(function (response) {
                $scope.names = response.data;
            });
        };

        getItems(true);
        loadDistinctNames();
    };

    app.controller("homeController", homeController);
})();