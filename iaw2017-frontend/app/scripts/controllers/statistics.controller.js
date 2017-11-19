'use strict';
angular.module('iaw2017App')
  .controller('StatisticsCtrl', ['$location', '$routeParams', '$scope', '$window', 'CampaignService',
    function ( $location, $routeParams, $scope, $window, CampaignService) {

        $scope.campaign = {};
        $window.data =[300, 600, 100];

        function initialize() {
            CampaignService.getCampaign($routeParams.id).then(function (campaign){
                $scope.campaign = campaign;
            });

        }

        initialize();

        $scope.goBack = function() {
            $location.path('/myCampaigns');
        };

  }]);
