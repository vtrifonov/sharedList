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
        }

        return {
            getItems: getItems,
            addItem: addItem
        };

    };

    var module = angular.module("sharedList");
    module.factory("itemsService", itemsService);

})();