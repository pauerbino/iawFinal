'use strict';
angular.module('iaw2017App')
  .controller('MyContactsCtrl', ['$location', '$scope', 'ContactService', function ( $location, $scope, ContactService) {

    $scope.contacts = [];

    function initialize() {
        ContactService.getContacts().then(function (contacts){
        	$scope.contacts = contacts;
        });
       // $scope.contacts = ContactService.getContacts();
    }

    initialize();

  }]);