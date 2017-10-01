'use strict';
angular.module('iaw2017App')
    .service('UserService', ["$q", "$timeout", function ($q, $timeout) {

    	var users = [
            {
                id: 1,
                username: "john.mayer",
                password: 123456,
                name: "John",
                lastName: "Mayer",
                email: "johnmayer@gmail.com",
                phone: "4525792"
            },
            {
                id: 2,
                username: "boris.grey",
                password: 123456,
                name: "Boris",
                lastName: "Grey",
                email: "borisgrey@gmail.com",
                phone: "4525792"
            },
            {
                id: 3,
                username: "emma.black",
                password: 123456,
                name: "Emma",
                lastName: "Black",
                email: "emmablack@gmail.com",
                phone: "4525792"
            }];

        this.getUsers = function() {
            var deferred = $q.defer();

            $timeout(function() {
                deferred.resolve(users);
            }, 500);

            return deferred.promise;

            //return users;
        };

        this.getUser = function(username) {
            var deferred = $q.defer();
            var result = users.filter(function (user) {
                return (user.username === username);
            });

            $timeout(function() {
                deferred.resolve(result);
            }, 500);

            return deferred.promise;
            //return users.filter(function (user) {
             //   return (user.username === username)
            //});
        };

        this.existUser = function(userLogged) {
            var deferred = $q.defer();
            var result = users.filter(function (user) {
                    return (user.username === userLogged.username && user.password === userLogged.password);
            });

            $timeout(function() {
                if (result.length > 0) {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }, 500);

            return deferred.promise;
            // var index = users.find(username === user.username && password === user.password);
            //var index = users.filter(function (user) {
            //    return (user.username === userLogged.username && user.password == userLogged.password)
            //});
            //if (index.length > 0)
            //    return true;
            //else
            //    return false;
        };

        this.createUser = function(user) {
            var deferred = $q.defer();
            var result = users.filter(function (u) {
                    return (u.username === user.username || u.email === user.email);
            });

            $timeout(function() {
                if (result.length > 0){
                    users.push({id: 4, username: user.username, password: user.password, name: user.name, lastName: user.lastName, email: user.email, phone: user.phone});
                    deferred.resolve(false);
                } else {
                    deferred.resolve(true);
                }
            }, 500);

            return deferred.promise;
            // var index = users.find(username === user.username && password === user.password);
            //var index = users.filter(function (user) {
            //    return (user.username === userLogged.username && user.password == userLogged.password)
            //});
            //if (index.length > 0)
            //    return true;
            //else
            //    return false;
        };
    }]);
