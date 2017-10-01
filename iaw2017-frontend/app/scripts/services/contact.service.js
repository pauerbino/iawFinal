'use strict';
angular.module('iaw2017App')
    .service('ContactService', ["$q", "$timeout", function ($q, $timeout) {

    	var contacts = [
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
            },
            {
                id: 4,
                name: "Juan",
                lastName: "Perez",
                username: "juan.perez",
                email: "juanperez@hotmail.com",
                phone: "45745792"
            },
            {
                id: 5,
                name: "Kate",
                lastName: "Harrington",
                username: "kate.harrington",
                email: "kateharringtom@live.com.ar",
                phone: "11882772"
            }];

        this.findContactByUserName = function(userName) {
            var deferred = $q.defer();
            var result = contacts.filter(function (contact) {
                return (contact.username === userName);
            });

            $timeout(function() {
                deferred.resolve(result);
            }, 500);

            return deferred.promise;
            //return { name: "Gina", lastName:"Turner"};
        };

        this.findContactByEmail = function(email) {
            var deferred = $q.defer();
            var result = contacts.filter(function (contact) {
                return (contact.email === email);
            });

            $timeout(function() {
                deferred.resolve(result);
            }, 500);

            return deferred.promise;
            //return { name: "Gina", lastName:"Turner"};
        };

        this.getContacts = function() {
            var deferred = $q.defer();

            $timeout(function() {
                deferred.resolve(contacts);
            }, 500);

            //return contacts;
            return deferred.promise;
        };

        this.createContact = function (contact) {
            var deferred = $q.defer();
            var exist = contacts.filter(function (c) {
                return (c.username === contact.username);
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
