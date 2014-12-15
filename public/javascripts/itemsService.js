(function () {
    var itemsService = function ($http) {

        var getItems = function (loaded) {
            return $http.get("items?t=" + new Date().getTime())
                .then(loaded);
        };

        var addItem = function(item){
            return $http.post("items", item);
        };

        var deleteItem = function(item){
            return $http.delete("items/delete/" + item.date + "/" + item.name);
        };

        var deleteDate = function(date){
            return $http.delete("items/deleteDate/" + date);
        };

        var getDistinctItems = function(loaded){
            return $http.get("items/distinct?t=" + new Date().getTime())
                .then(loaded);
        };

        var getDates = function(loaded){
            return $http.get("items/dates?t=" + new Date().getTime())
                .then(loaded)
        };

        var updatePerson = function(date, person){
            return $http.put("items/" + date + "/" + person.name + "/", person);
        }

        return {
            getItems: getItems,
            addItem: addItem,
            getDistinctItems: getDistinctItems,
            getDates: getDates,
            deleteItem: deleteItem,
            deleteDate: deleteDate,
            updatePerson: updatePerson
        };

    };

    var module = angular.module("sharedList");
    module.factory("itemsService", itemsService);

})();