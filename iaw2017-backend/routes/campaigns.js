var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Campaign = require('../model/campaignModel.js');


router.get('/', function(req, res, next) {
    Campaign.find(function (err, campaigns) {
        if (err) return next(err);
        res.json(campaigns);
    });
});

router.get('/:id', function(req, res, next) {
    Campaign.findById(req.params.id).exec(function(err, campaign) {
        if (err) return next(err);
        res.json(campaign);
    });
});

router.post('/', function(req, res, next) {
    var newCampaign = new Campaign ({
          title : req.body.title,
          subject : req.body.subject,
          from: req.body.from,
          list : req.body.list,
          content : req.body.content,
          participants : req.body.participants
    });
    newCampaign.save(function(err) {
        if (err) throw err;
        res.json(newCampaign);
    });
});

router.put('/:id', function(req, res, next) {
    Campaign.findByIdAndUpdate(req.params.id, req.body, function (err, put) {
        if (err) return next(err);
        res.json(put);
    });
});

router.delete('/:id', function(req, res, next) {
    Campaign.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
