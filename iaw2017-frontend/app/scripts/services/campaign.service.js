'use strict';
angular.module('iaw2017App')
    .service('CampaignService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {

    	var cache = {
            campaigns: null
        };

        /*var campaigns = [
            {
                id: 1,
                title: "Health Campaign",
                subject: "Campaign to help smoker become aware of smoking risks",
                fromId: 1,
                listId: 1,
                content: "<h1>Health Campaign</h1>",
                participants: 3,
                quantityOpened: 2,
                quantityLinked: 1
            },
            {
                id: 2,
                title: "Green City",
                subject: "Activities for becoming a green city",
                fromId: 3,
                listId: 2,
                content: "<h1>Green City</h1>",
                participants: 3,
                quantityOpened: 3,
                quantityLinked: 3
            },
            {
                id: 3,
                title: "Alcohol Campaign",
                subject: "Campaign to help alcoholics",
                fromId: 2,
                listId: 2,
                content: "<h1>Alcohol Campaign</h1>",
                participants: 3,
                quantityOpened: 3,
                quantityLinked: 1
            }];*/

        this.reset = function() {
            cache = {
                lists: null
            };
        };

        this.getCampaigns = function() {
            var deferred = $q.defer();

            if (cache.campaigns) {
                deferred.resolve(cache.campaigns);
            } else {
               $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/campaigns/'
                }).then(function (response) {
                    cache.campaigns = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
           // return campaigns;
        };

        this.newCampaign = function(campaign, userId, listSize) {
            var deferred = $q.defer();
            var c = {id: 1, title: campaign.title, subject: campaign.subject, from: userId, listId: campaign.listId, content: campaign.content, participants: listSize, quantityOpened: 0, quantityLinked: 0}
            var self = this;
           // $timeout(function() {
           //     var result = campaigns.push({id: 4, title: campaign.title, subject: campaign.subject, from: userId, listId: campaign.listId, content: campaign.content, participants: listSize, quantityOpened: 0, quantityLinked: 0});
            //   deferred.resolve(result);
            //}, 500);

            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/campaigns/',
                data: c
            }).then(function(response) {
                self.reset();
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
            //return (campaigns.push({id: 4, title: campaign.title, subject: campaign.subject, from: userId, listId: campaign.listId, content: campaign.content, participants: listSize, quantityOpened: 0, quantityLinked: 0}));
        };

    }]);
