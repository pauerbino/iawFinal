'use strict';
angular.module('iaw2017App')
  .controller('StatisticsCtrl', ['$location', '$routeParams', '$scope', '$window', 'CampaignService',
    function ( $location, $routeParams, $scope, $window, CampaignService) {

        $scope.campaign = {};
        $window.data =[0, 0];
        $scope.opened = 0;

        function initialize() {
            CampaignService.getCampaign($routeParams.id).then(function (campaign){
                $scope.campaign = campaign;
                for (var i = 0; i < campaign.mails.length; i++) {
                    if (campaign.mails[i].open) {
                        $scope.opened ++;
                    }
                }
                $window.data = [ campaign.mails.length, $scope.opened]
            });
        }

        initialize();

        $scope.goBack = function() {
            $location.path('/myCampaigns');
        };

  }]);
