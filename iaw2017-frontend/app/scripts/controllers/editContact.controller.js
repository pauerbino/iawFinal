'use strict';
angular.module('iaw2017App')
  .controller('EditContactCtrl', ['$location', '$routeParams', '$scope', 'ContactService',
    function ( $location, $routeParams, $scope, ContactService) {

        $scope.contact = {};

        function initialize() {
            ContactService.getContact($routeParams.id).then(function(response){
                $scope.contact = response;
            });
        }

        initialize();

        $scope.editContact = function() {
            if ($scope.editContactForm.$valid) {
                ContactService.editContact($scope.contact).then(function() {
                    $location.path('/myContacts');
                });
            }
        };

        $scope.goBack = function() {
            $location.path('/myContacts');
        };

  }]);
