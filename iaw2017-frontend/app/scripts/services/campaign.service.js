'use strict';
angular.module('iaw2017App')
    .service('CampaignService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {

        var service = {};

        var cache = {
            campaigns: null
        };

        service.reset = function() {
            cache = {
                campaigns: null
            };
        };

        service.getCampaigns = function() {
            var deferred = $q.defer();

            if (cache.campaigns) {
                deferred.resolve(cache.campaigns);
            } else {
               $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/campaigns'
                }).then(function (response) {
                    cache.campaigns = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getCampaign = function(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/campaigns/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.newCampaign = function(campaign, userId, listSize) {
            var deferred = $q.defer();
            var c = {title: campaign.title, subject: campaign.subject, listId: campaign.listId, content: campaign.content, participants: listSize, quantityOpened: 0, quantityLinked: 0};
           // $timeout(function() {
           //     var result = campaigns.push({id: 4, title: campaign.title, subject: campaign.subject, from: userId, listId: campaign.listId, content: campaign.content, participants: listSize, quantityOpened: 0, quantityLinked: 0});
            //   deferred.resolve(result);
            //}, 500);

            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/campaigns',
                data: c
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
            //return (campaigns.push({id: 4, title: campaign.title, subject: campaign.subject, from: userId, listId: campaign.listId, content: campaign.content, participants: listSize, quantityOpened: 0, quantityLinked: 0}));
        };

        service.editCampaign = function(campaign, userId, listSize) {
            var deferred = $q.defer();
            var id = campaign._id;
            var c = {title: campaign.title, subject: campaign.subject, list: campaign.list, content: campaign.content, participants: listSize, quantityOpened: campaign.quantityOpened, quantityLinked: campaign.quantityLinked};
           // $timeout(function() {
           //     var result = campaigns.push({id: 4, title: campaign.title, subject: campaign.subject, from: userId, listId: campaign.listId, content: campaign.content, participants: listSize, quantityOpened: 0, quantityLinked: 0});
            //   deferred.resolve(result);
            //}, 500);

            $http({
                method : 'PUT',
                url : Configuration.getConfiguration().baseURL + '/campaigns/' + id,
                data: c
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
            //return (campaigns.push({id: 4, title: campaign.title, subject: campaign.subject, from: userId, listId: campaign.listId, content: campaign.content, participants: listSize, quantityOpened: 0, quantityLinked: 0}));
        };

        service.deleteCampaign = function(id) {
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: Configuration.getConfiguration().baseURL + '/campaigns/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        return service;
    }]);
