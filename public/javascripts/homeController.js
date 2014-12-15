(function () {
    'use strict';

    var app = angular.module("sharedList");

    var homeController = function ($scope, $modal, lodash, itemsService) {

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
                    name: name,
                    sure: false,
                    note: ''
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
        };

        $scope.modifyPersonNote = function(person){
            editNote(person.note).then(function(result){
                if(result.success) {
                    person.note = result.data;
                    $scope.updatePerson(person);
                }
            });
        };

        var editNote = function(note){
            var modalInstance = $modal.open({
                templateUrl: 'views/modal.html',
                controller: "modalController",

                resolve: {
                    settings: function () {
                        return {
                            header: 'Забележка:',
                            defaultMessage: note,
                            multiline: true
                        };
                    }
                }
            });

            return modalInstance.result;
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

        $scope.changeSure = function(person){
            person.sure = !person.sure;
            $scope.updatePerson(person);
        }

        $scope.updatePerson = function(person) {
            itemsService.updatePerson($scope.selectedItem.date, person);
        }

        Object.defineProperty($scope, 'surePersons', {
            get: function () {
                if($scope.selectedItem && $scope.selectedItem.items) {
                    var sureOnes = lodash.filter($scope.selectedItem.items, function (item) {
                        return item.sure;
                    });
                    return sureOnes.length;
                }
                else
                {
                    return 0;
                }
            }
        });

        getItems(true);
        loadDistinctNames();
    };

    app.controller("homeController", homeController);
})();