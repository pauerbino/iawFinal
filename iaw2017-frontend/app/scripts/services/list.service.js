'use strict';
angular.module('iaw2017App')
    .service('ListService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        var cache = {
            lists: null
        };
        // var lists = [
        //     {
        //         name: 'List1',
        //         id: 1,
        //         contacts: [
        //             {
        //                 id: 1,
        //                 name: "John",
        //                 lastName: "Mayer",
        //                 username: "john.mayer",
        //                 email: "johnmayer@gmail.com",
        //                 phone: "4525792"
        //             },
        //             {
        //                 id: 2,
        //                 name: "Boris",
        //                 lastName: "Grey",
        //                 username: "boris.grey",
        //                 email: "borisgrey@gmail.com",
        //                 phone: "4525792"
        //             },
        //             {
        //                 id: 3,
        //                 name: "Emma",
        //                 lastName: "Black",
        //                 username: "emma.black",
        //                 email: "emmablack@gmail.com",
        //                 phone: "4525792"
        //             }
        //         ]
        //     },{
        //         name: 'List2',
        //         id: 2,
        //         contacts: [
        //             {
        //                 id: 1,
        //                 name: "John",
        //                 lastName: "Mayer",
        //                 username: "john.mayer",
        //                 email: "johnmayer@gmail.com",
        //                 phone: "4525792"
        //             },
        //             {
        //                 id: 2,
        //                 name: "Boris",
        //                 lastName: "Grey",
        //                 username: "boris.grey",
        //                 email: "borisgrey@gmail.com",
        //                 phone: "4525792"
        //             },
        //             {
        //                 id: 3,
        //                 name: "Emma",
        //                 lastName: "Black",
        //                 username: "emma.black",
        //                 email: "emmablack@gmail.com",
        //                 phone: "4525792"
        //             }
        //         ]
        //     }];

        this.reset = function() {
            cache = {
                lists: null
            };
        };

        this.getLists = function() {
            var deferred = $q.defer();
            if (cache.lists) {
                console.log('entro al if');
                deferred.resolve(cache.lists);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/lists'
                }).then(function (response) {
                    console.log(response);
                    cache.lists = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        this.getList = function(id) {
            var deferred = $q.defer();
            console.log(id);
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/lists/' + id
            }).then(function (response) {
                console.log(response.data);
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        this.deleteList = function(id) {
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: Configuration.getConfiguration().baseURL + '/lists/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        this.deleteContactFromList = function() {

        };

        this.saveList = function(list) {
            var deferred = $q.defer();
            //var body = {};
            console.log("se va a guardar en la BD");
            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/lists',
                data: list
            }).then(function(response) {
                console.log("Ya se guardo la lista");
                deferred.resolve(response);
            }).catch(function(response) {
                console.log("Huboerrorrrrr");
                deferred.reject(response);
            });
            return deferred.promise;
        };

    }]);
