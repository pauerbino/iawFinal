'use strict';
angular.module('iaw2017App')
  .controller('SigninCtrl', ['$location', '$scope', 'UserService', function ($location, $scope, UserService) {

    $scope.credentials = {
      name : "",
      email : "",
      password : ""
    };

    $scope.register = function() {
        console.log('Submitting registration');
        UserService.register($scope.credentials).then(function(){
          console.log("ahora hace");
          $location.path('/lists');
        });
    };

  }]);


// 'use strict';
// angular.module('iaw2017App')
//   .controller('SigninCtrl', ['$location', '$scope', 'UserService', function ( $location, $scope, UserService) {

//     $scope.users = [];
//     $scope.error = '';

//     function initialize() {
//         $scope.error = '';
//         UserService.getUsers().then(function(users) {
//             $scope.users = users;
//         });
//         //$scope.users = UserService.getUsers();
//     }

//     initialize();

//     $scope.register = function(user) {
//     	//exist = UserService.existUser(user);
//         if (user.password !== user.confirmPassword) {
//             $scope.error = 'The passwords do not match';
//             user.password = '';
//             user.confirmPassword = '';
//             $location.path('/registerMe');
//         }
//         else{
//             UserService.createUser(user).then(function(result) {
//             if (result) {
//                 $location.path('/myCampaigns');
//             } else {
//                 $scope.error = 'The username or email already exists. Please try a new one.';
//                 user.username = '';
//                 user.email = '';
//                 $location.path('/registerMe');
//             }
//         });
//         }
//     };

//   }]);
