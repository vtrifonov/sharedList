(function () {
    var itemsService = function ($http) {

        var getItems = function () {
            return $http.get("items")
                .then(function (response) {
                    return response.data;
                });
        };

        var addItem = function(item){
            return $http.post("items", item);
        };

        var getDistinctItems = function(){
            return $http.get("items/distinct")
                .then(function(response){
                    return response.data;
                })
        }

        return {
            getItems: getItems,
            addItem: addItem,
            getDistinctItems: getDistinctItems
        };

    };

    var module = angular.module("sharedList");
    module.factory("itemsService", itemsService);

})();