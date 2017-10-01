'use strict';
angular.module('iaw2017App')
  .controller('NewContactCtrl', ['$location', '$routeParams', '$scope', 'ContactService', 'ListService',
    function ( $location, $routeParams, $scope, ContactService, ListService) {

    $scope.lists = [];
    $scope.contact = {};
    $scope.searchSelectAllSettings = { enableSearch: true, showSelectAll: true, keyboardControls: true };
    $scope.searchSelectAllModel = [];
    $scope.contacts = [];
    $scope.example1model = [];
    $scope.example1data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"} ];

    function initialize() {
        ListService.getLists().then(function (lists){
            $scope.lists = lists;
        });
        ContactService.getContacts().then(function (contacts){
            $scope.contacts = contacts;
        });
    }

    initialize();

    $scope.newContact = function(contact) {
        // ContactService.createContact(contact).then(function(result) {
        //     if (result){
        //         ContactService.getContacts().then(function (contacts){
        //             $scope.contacts = contacts;
        //         });
        //         $location.path('/myContacts');
        //     }
        //     else {
        //         $location.path('/newContact');
        //     }
        // });
    };

  }]);
