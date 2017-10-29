'use strict';
angular.module('iaw2017App')
  .controller('NewContactCtrl', ['$location', '$scope', 'ContactService',
    function ( $location, $scope, ContactService) {

        $scope.contact = {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            tags: []
        };

        $scope.userExist = false;

        function initialize() {
        }

        initialize();

        $scope.newContact = function() {
            if ($scope.newContactForm.$valid) {
                ContactService.existContact($scope.contact).then(function(response){
                    if (response) {
                        $scope.userExist = true;
                    } else {
                        ContactService.createContact($scope.contact).then(function() {
                            $location.path('/myContacts');
                        });
                    }
                });
            }
        };

        $scope.goBack = function() {
            $location.path('/myContacts');
        };

  }]);
