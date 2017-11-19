'use strict';
angular.module('iaw2017App')
  .controller('MyCampaignsCtrl', ['$location', '$scope', 'CampaignService', 'UserService', function ( $location, $scope, CampaignService, UserService) {

    $scope.campaigns = [];

    $scope.currentUser = {
        email : "",
        name : ""
    }

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            CampaignService.reset();
            CampaignService.getCampaigns($scope.currentUser.email).then(function (campaigns){
                $scope.campaigns = campaigns;
            });
        }
        else {
            $location.path('/forbiddenAccess');
        }
    }

    initialize();

    $scope.deleteCampaign = function(campaignId) {
        CampaignService.deleteCampaign(campaignId).then(function (){
            initialize();
        });
    };

    $scope.editCampaign = function(campaignId) {
        $location.path('/editCampaign/'+campaignId);
    };

    $scope.goToNewCampaign = function() {
        $location.path('/newCampaign');
    };

    $scope.goToStatistics  = function(id) {
        $location.path('/statistics/'+id);
    };


  }]);
