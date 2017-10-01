'use strict';
angular.module('iaw2017App')
  .controller('LoginCtrl', ['$location', '$scope', 'UserService', function ( $location, $scope, UserService) {

    $scope.users = [];
    $scope.error = '';

    function initialize() {
        $scope.error = '';
        UserService.getUsers().then(function(users) {
            $scope.users = users;
        });
        //$scope.users = UserService.getUsers();
    }

    initialize();

    $scope.logIn = function(user) {
    	//exist = UserService.existUser(user);
        UserService.existUser(user).then(function(result) {
            if (result) {
                $location.path('/contacts');
            } else {
                user.username = "";
                user.password = "";
                $scope.error = 'Invalid username or password.';
                $location.path('/login');
            }
        });
        //if (exist) $location.path('/contacts');
    	//else{
    	//	user.username = "";
    	//	user.password = "";
    	//	$location.path('/login');
    	//}
    };

  }]);
