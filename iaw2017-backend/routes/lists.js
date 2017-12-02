var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/userModel.js');
var List = require('../model/listModel.js');

router.get('/:email', function(req, res, next) {
    User.find({"email": req.params.email}).exec(function(err,u) {
        console.log(u);
        List.find({"user" : u}).populate('contacts').exec(function(err, list) {
            console.log('entro en el get');
            if (err) return next(err);
            res.json(list);
        });
    });
    //         console.log('paso por aca');
    //List.find(function (err, lists) {
    //    if (err) return next(err);
    //    res.json(lists);
    //});
});

router.get('/:id/:email', function(req, res, next) {
   User.find({"email": req.params.email}).exec(function(err,u) {
        List.find({"_id" : req.params.id, "user" : u}).populate('contacts').exec(function(err, list) {
            if (err) return next(err);
            res.json(list[0]);
        });
    });
  //  List.findById(req.params.id).populate('contacts').exec(function(err, list) {
  //      if (err) return next(err);
  //      res.json(list);
  //  });
});

router.post('/', function(req, res, next) {
    var contactsList = [] ;
    for(var c of req.body.contacts) {
        contactsList.push(c._id);
    }
    User.find({"email": req.body.email}).exec(function(err,u) {
        var newList = new List ({
            name : req.body.name,
            user : u[0]._id,
            contacts : contactsList
        });
        console.log(newList);
        newList.save(function(err) {
            if (err) throw err;
            res.json(newList);
        });
    });
});

router.put('/:id', function(req, res, next) {
    var contactsList = [] ;
    for(var c of req.body.contacts) {
        contactsList.push(c._id);
    }
    var body = {
        name: req.body.name,
        contacts: contactsList
    }
    List.findByIdAndUpdate(req.params.id, body, function (err, put) {
        if (err) return next(err);
        res.json(put);
    });
});

router.delete('/:id', function(req, res, next) {
    List.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
