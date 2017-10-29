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
    }

    initialize();

    $scope.deleteCampaign = function(campaignId) {
        CampaignService.deleteCampaign(campaignId).then(function (){
            $location.path("/home");
        });
    };

    $scope.editCampaign = function(campaignId) {
        $location.path("/editCampaign/"+campaignId);
    };

  }]);
