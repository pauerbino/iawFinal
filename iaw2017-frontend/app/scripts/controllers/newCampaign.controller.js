'use strict';
angular.module('iaw2017App')
  .controller('NewCampaignCtrl', ['$location', '$scope', 'CampaignService', 'ListService', 'UserService', function ( $location, $scope, CampaignService, ListService, UserService) {

    // $scope.campaigns = [];
    $scope.lists = [];
    $scope.campaign = {
        title: "",
        subject: "",
        list: {},
        content: "",
        participants: 0
    };

    function initialize() {
        // CampaignService.getCampaigns().then(function (campaigns){
        //     $scope.campaigns = campaigns;
        // });
        ListService.getLists().then(function (lists){
            $scope.lists = lists;
        });
        //$scope.campaigns = CampaignService.getCampaigns();
        //$scope.lists = ListService.getLists();
    }

    initialize();

    $scope.newCampaign = function(campaign) {
        //var user UserService.getUser(campaign.from);

        UserService.getUser(campaign.from).then(function(user) {
            if (user.length > 0){
                var listSize = ListService.getList(campaign.listId).size();
                ListService.getList(campaign.listId).then(function(list) {
                    $scope.campaign.participants = list.contacts.length;
                    CampaignService.newCampaign(campaign, user[0].id, listSize).then(function(result) {
                    //var result = CampaignService.newCampaign(campaign, user[0].id, listSize);
                        if (result){
                            CampaignService.getCampaigns().then(function (campaigns){
                                $scope.campaigns = campaigns;
                            });
                            $location.path('/myCampaigns');
                        }
                        else {
                            $location.path('/newCampaign');
                        }
                    });
                });
            }
            else {
                $location.path('/newCampaign');
            }
        });
    };

  }]);
