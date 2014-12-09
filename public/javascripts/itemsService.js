(function () {
    var itemsService = function ($http) {

        var getItems = function (loaded) {
            return $http.get("items")
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
            return $http.get("items/distinct")
                .then(loaded);
        };

        var getDates = function(loaded){
            return $http.get("items/dates")
                .then(loaded)
        };

        return {
            getItems: getItems,
            addItem: addItem,
            getDistinctItems: getDistinctItems,
            getDates: getDates,
            deleteItem: deleteItem,
            deleteDate: deleteDate
        };

    };

    var module = angular.module("sharedList");
    module.factory("itemsService", itemsService);

})();