'use strict';
angular.module('iaw2017App')
    .service('ContactService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {

    	var cache = {
            contacts: null
        };

//        var contacts = [
  //          {
    //            id: 1,
      //          name: "John",
        //        lastName: "Mayer",
        //        username: "john.mayer",
        //        email: "johnmayer@gmail.com",
        //        phone: "4525792"
        //    },
        //    {
        //        id: 2,
        //        name: "Boris",
        //        lastName: "Grey",
        //        username: "boris.grey",
        //        email: "borisgrey@gmail.com",
        //        phone: "4525792"
        //    },
        //    {
            //     id: 3,
            //     name: "Emma",
            //     lastName: "Black",
            //     username: "emma.black",
            //     email: "emmablack@gmail.com",
            //     phone: "4525792"
            // },
            // {
            //     id: 4,
            //     name: "Juan",
            //     lastName: "Perez",
            //     username: "juan.perez",
            //     email: "juanperez@hotmail.com",
            //     phone: "45745792"
            // },
            // {
            //     id: 5,
            //     name: "Kate",
            //     lastName: "Harrington",
            //     username: "kate.harrington",
            //     email: "kateharringtom@live.com.ar",
            //     phone: "11882772"
            // }];

        this.reset = function() {
            cache = {
                contacts: null
            };
        };

        this.findContactByUserName = function(userName) {
            var deferred = $q.defer();
            //var result = contacts.filter(function (contact) {
            //    return (contact.username === userName);
            //});

            if (cache.contacts) {
                var result = cache.contacts.filter(function (contact) {
                    return (contact.username === userName);
                });
                deferred.resolve(result);
            }
            else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/contacts/'
                }).then(function (response) {
                    cache.contacts = response.data;
                    deferred.resolve(cache.contacts.filter(function (contact) {
                        return (contact.username === userName);
                    }));
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
            //return { name: "Gina", lastName:"Turner"};
        };

        this.findContactByEmail = function(email) {
            var deferred = $q.defer();
            
            if (cache.contacts) {
                var result = cache.contacts.filter(function (contact) {
                    return (contact.email === email);
                });
                deferred.resolve(result);
            }
            else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/contacts/'
                }).then(function (response) {
                    cache.contacts = response.data;
                    deferred.resolve(cache.contacts.filter(function (contact) {
                        return (contact.email === email);
                    }));
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
            //return { name: "Gina", lastName:"Turner"};
        };

        this.getContacts = function() {
            var deferred = $q.defer();
            
            if (cache.contacts) {
                deferred.resolve(cache.contacts);
            } else {
               $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/contacts/'
                }).then(function (response) {
                    cache.contacts = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            //return contacts;
            return deferred.promise;
        };

        this.createContact = function (contact) {
            var deferred = $q.defer();
            var exist = contacts.filter(function (c) {
                return (c.username === contact.username);
            });

            var body = {};

            $http({
                method : 'PUT',
                url : Configuration.getConfiguration().baseURL + '/contacts/' + id,
                data: body
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            $timeout(function() {
                var result = false;
                if (exist.length === 0){
                    result = true;
                    contacts.push({id: 6, name: contact.name, lastName: contact.lastName, username: contact.username, email: contact.email, phone: contact.phone});
                }
                deferred.resolve(result);
            }, 500);

            return deferred.promise;
        };

    }]);
