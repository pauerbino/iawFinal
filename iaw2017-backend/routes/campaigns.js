var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

var campaigns = [
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
            }];

var campaignsById = {};

router.put('/:id', function(req, res, next) {
  var updatedCampaign = req.body;
  
  var id = req.params["id"];    
  var campaign = campaignById[id];
  if (campaign) {
      //.name = updatedContact.name;
      res.json(contact);
  } else {
      res.status(404).send("not found");
  }
});


router.get('/', function(req, res, next) {
  res.json(campaigns);
});

router.get('/:id', function(req, res, next) {
  var id = req.params["id"];    
  var campaign = campaignsById[id];
  if (campaign) {
      res.json(campaign);
  } else {
      res.status(404).send("not found");
  }
});

router.delete('/:id', function(req, res, next) {
  var id = req.params["id"];    
  var campaign = campaignsById[id];
  
  if (campaign) {
      delete campaignsById[id];
      contacts.splice(campaigns.indexOf(campaign), 1)
      res.json(campaign);
  } else {
      res.status(404).send("not found");
  }
  
});


router.post('/', function(req, res, next) {
  var campaign = req.body;
  campaign.id = uuid();
  campaigns.push(campaign);
  campaignsById[campaign.id] = campaign;
  res.send(campaign);
});

module.exports = router;
