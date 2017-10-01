'use strict';
angular.module('iaw2017App')
    .service('ListService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        var cache = {
            lists: null
        };
        var lists = [
            {
                name: 'List1',
                id: 1,
                contacts: [
                    {
                        id: 1,
                        name: "John",
                        lastName: "Mayer",
                        username: "john.mayer",
                        email: "johnmayer@gmail.com",
                        phone: "4525792"
                    },
                    {
                        id: 2,
                        name: "Boris",
                        lastName: "Grey",
                        username: "boris.grey",
                        email: "borisgrey@gmail.com",
                        phone: "4525792"
                    },
                    {
                        id: 3,
                        name: "Emma",
                        lastName: "Black",
                        username: "emma.black",
                        email: "emmablack@gmail.com",
                        phone: "4525792"
                    }
                ]
            },{
                name: 'List2',
                id: 2,
                contacts: [
                    {
                        id: 1,
                        name: "John",
                        lastName: "Mayer",
                        username: "john.mayer",
                        email: "johnmayer@gmail.com",
                        phone: "4525792"
                    },
                    {
                        id: 2,
                        name: "Boris",
                        lastName: "Grey",
                        username: "boris.grey",
                        email: "borisgrey@gmail.com",
                        phone: "4525792"
                    },
                    {
                        id: 3,
                        name: "Emma",
                        lastName: "Black",
                        username: "emma.black",
                        email: "emmablack@gmail.com",
                        phone: "4525792"
                    }
                ]
            }];

        this.reset = function() {
            cache = {
                lists: null
            };
        };

        this.getLists = function() {
            var deferred = $q.defer();
            if (cache.lists) {
                deferred.resolve(cache.lists);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/lists'
                }).then(function (response) {
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

            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/lists/' + id
            }).then(function (response) {
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

        this.deleteContactFromList = function(listId, contactId) {

        };

        this.saveList = function(list) {
            var deferred = $q.defer();
            var body = {};

            $http({
                method : 'PUT',
                url : Configuration.getConfiguration().baseURL + '/lists/' + id,
                data: body
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

    }]);
