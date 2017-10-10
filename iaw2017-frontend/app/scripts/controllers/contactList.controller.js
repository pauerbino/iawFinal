'use strict';
angular.module('iaw2017App')
  .controller('ContactListCtrl', ['$location', '$routeParams', '$scope', 'ListService',
    function ( $location, $routeParams, $scope, ListService) {

    $scope.list = {};

    function initialize() {
        ListService.getList($routeParams.id).then(function (list){
            $scope.list = list;
            console.log($scope.list);
        });
        //$scope.list = ListService.getList($routeParams.id);
    }

    initialize();

    $scope.deleteList = function() {
        ListService.deleteList($routeParams.id).then(function (){
            $location.path("/contacts");
        });
        //ListService.deleteList($routeParams.id);
        //$location.path("/contacts");
    };

    $scope.editList = function() {
        $location.path("/editList/"+$routeParams.id);
    };

    $scope.deleteContactFromList = function(id) {
        ListService.deleteContactFromList($routeParams.id, id).then(function (){
            initialize();
        });

        //ListService.deleteContactFromList($routeParams.id, id);
        //initialize();
    };

    $scope.editContactFromList = function(id) {
       $location.path("/editContact/"+ id);
    };
  }]);
