'use strict';
angular.module('iaw2017App')
    .service('UserService', ['$http', '$q', '$rootScope', '$window', 'Configuration', function ($http, $q, $rootScope, $window, Configuration) {
        var service = {};

        function saveToken (token) {
            $window.localStorage['mean-token'] = token;
        }

        function getToken () {
            return $window.localStorage['mean-token'];
        }

        service.isLoggedIn = function() {
            var token = getToken();
            var payload;

            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return payload.exp > Date.now() / 1000;
            }
            else {
                return false;
            }
        };

        service.currentUser = function() {

            if(service.isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    email : payload.email,
                    name : payload.name
                };
            }
        };

        service.register = function(user) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: Configuration.getConfiguration().baseURL + '/register',
                data: user
            }).then(function (response) {
                saveToken(response.data.token);
                $rootScope.$broadcast('updateNavigation');
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.login = function(user) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: Configuration.getConfiguration().baseURL + '/users',
                data: user
            }).then(function (response) {
                saveToken(response.data.token);
                $rootScope.$broadcast('updateNavigation');
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.logout = function() {
            $window.localStorage.removeItem('mean-token');
            $rootScope.$broadcast('updateNavigation');
        };

        service.getProfile = function () {
            return $http.get('/api/profile', {
                headers: {
                    Authorization: 'Bearer '+ getToken()
            }
            });
        };

        return service;

    }]);


// 'use strict';
// angular.module('iaw2017App')
//     .service('UserService', ["$q", "$timeout", function ($q, $timeout) {

//     	var users = [
//             {
//                 id: 1,
//                 username: "john.mayer",
//                 password: 123456,
//                 name: "John",
//                 lastName: "Mayer",
//                 email: "johnmayer@gmail.com",
//                 phone: "4525792"
//             },
//             {
//                 id: 2,
//                 username: "boris.grey",
//                 password: 123456,
//                 name: "Boris",
//                 lastName: "Grey",
//                 email: "borisgrey@gmail.com",
//                 phone: "4525792"
//             },
//             {
//                 id: 3,
//                 username: "emma.black",
//                 password: 123456,
//                 name: "Emma",
//                 lastName: "Black",
//                 email: "emmablack@gmail.com",
//                 phone: "4525792"
//             }];

//         this.getUsers = function() {
//             var deferred = $q.defer();

//             $timeout(function() {
//                 deferred.resolve(users);
//             }, 500);

//             return deferred.promise;

//             //return users;
//         };

//         this.getUser = function(username) {
//             var deferred = $q.defer();
//             var result = users.filter(function (user) {
//                 return (user.username === username);
//             });

//             $timeout(function() {
//                 deferred.resolve(result);
//             }, 500);

//             return deferred.promise;
//             //return users.filter(function (user) {
//              //   return (user.username === username)
//             //});
//         };

//         this.existUser = function(userLogged) {
//             var deferred = $q.defer();
//             var result = users.filter(function (user) {
//                     return (user.username === userLogged.username && user.password === userLogged.password);
//             });

//             $timeout(function() {
//                 if (result.length > 0) {
//                     deferred.resolve(true);
//                 } else {
//                     deferred.resolve(false);
//                 }
//             }, 500);

//             return deferred.promise;
//             // var index = users.find(username === user.username && password === user.password);
//             //var index = users.filter(function (user) {
//             //    return (user.username === userLogged.username && user.password == userLogged.password)
//             //});
//             //if (index.length > 0)
//             //    return true;
//             //else
//             //    return false;
//         };

//         this.createUser = function(user) {
//             var deferred = $q.defer();
//             var result = users.filter(function (u) {
//                     return (u.username === user.username || u.email === user.email);
//             });

//             $timeout(function() {
//                 if (result.length > 0){
//                     users.push({id: 4, username: user.username, password: user.password, name: user.name, lastName: user.lastName, email: user.email, phone: user.phone});
//                     deferred.resolve(false);
//                 } else {
//                     deferred.resolve(true);
//                 }
//             }, 500);

//             return deferred.promise;
//             // var index = users.find(username === user.username && password === user.password);
//             //var index = users.filter(function (user) {
//             //    return (user.username === userLogged.username && user.password == userLogged.password)
//             //});
//             //if (index.length > 0)
//             //    return true;
//             //else
//             //    return false;
//         };
//     }]);
