'use strict';
angular.module('iaw2017App')
  .controller('NewListCtrl', ['$location', '$routeParams', '$scope', 'ContactService', 'ListService',
    function ( $location, $routeParams, $scope, ContactService, ListService) {

    $scope.list = {
        id: 3,
        name: '',
        contacts: []
    };

    $scope.newContact = '';

    $scope.saveList = function() {
        //ListService.saveList($scope.list);
        ListService.saveList($scope.list).then(function() {
            console.log("hay que redireccionar");
            $location.path('/lists');
        });
        //$location.path('/contacts');
    };

    $scope.goBack = function() {
        $location.path('/contacts');
    };

    $scope.addContact = function() {
        $scope.alert = false;
        var contact = $scope.newContact.split(" ");
        var name = contact[0];
        var lastName = contact[1];
        //var contact = ContactService.findContactByUserName($scope.newContact);
        ContactService.findContactByUserName(name, lastName).then(function(contact) {
            if (contact.length > 0) {
                console.log(contact);
               // console.log(contact[0]._id) tiene l ID
                $scope.list.contacts.push(contact[0]);
                console.log($scope.list);
            } else {
                $scope.alert = true;
            }
            $scope.newContact = '';
        });

    };

    $scope.removeContact = function(id) {
        $scope.list.contacts.splice($scope.list.contacts.indexOf(id), 1);
    };

  }]);
