'use strict';
angular.module('iaw2017App')
  .controller('MyCampaignsCtrl', ['$location', '$scope', 'CampaignService', 'ListService', 'UserService', function ( $location, $scope, CampaignService, ListService, UserService) {

    $scope.campaigns = [];

    function initialize() {
        CampaignService.getCampaigns().then(function (campaigns){
        	$scope.campaigns = campaigns;
        });
        ListService.getLists().then(function (lists){
        	$scope.lists = lists;
        });
        UserService.getUsers().then(function(users){
        	$scope.users = users;
        });

        //$scope.campaigns = CampaignService.getCampaigns();
        //$scope.lists = ListService.getLists();
        //$scope.users = UserService.getUsers();
    }

    initialize();
  
  }]);