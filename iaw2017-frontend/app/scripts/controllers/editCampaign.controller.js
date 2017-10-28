'use strict';
angular.module('iaw2017App')
  .controller('EditCampaignCtrl', ['$location', '$routeParams', '$scope', 'CampaignService', 'ListService', 'UserService', function ( $location, $routeParams, $scope, CampaignService, ListService, UserService) {

    $scope.campaign = {};

    function initialize() {
        CampaignService.getCampaign($routeParams.id).then(function (campaign){
            $scope.campaign = campaign;
            console.log(campaign);
        });
        ListService.getLists().then(function (lists){
            $scope.lists = lists;
        });
        UserService.getUsers().then(function(users){
            $scope.users = users;
        });
    }

    initialize();

    $scope.saveCampaign = function(campaign) {
        //var user UserService.getUser(campaign.from);
        console.log("se actualizara la campaña");
        UserService.getUser(campaign.from).then(function(user) {
            if (user.length > 0){
                //var listSize = ListService.getList(campaign.listId).size();
                ListService.getList(campaign.list).then(function(lists) {
                    var listSize = lists.contacts.length;
                    console.log("va a updatear la cmapaña");
                    CampaignService.editCampaign(campaign, user[0].id, listSize).then(function(result) {
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