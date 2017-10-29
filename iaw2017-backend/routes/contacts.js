var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = require('../model/contactModel.js');


router.get('/', function(req, res, next) {
    Contact.find(function (err, contacts) {
        if (err) return next(err);
        res.json(contacts);
    });
});

router.get('/:id', function(req, res, next) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err) return next(err);
        res.json(contact);
    });
});

router.post('/', function(req, res, next) {
    var newContact = new Contact ({
        name : req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        tags : req.body.tags
    });

    newContact.save(function(err) {
        if (err) throw err;
        res.json(newContact);
    });
});

router.put('/:id', function(req, res, next) {
    Contact.findByIdAndUpdate(req.params.id, req.body, function (err, put) {
        if (err) return next(err);
        res.json(put);
    });
});

router.delete('/:id', function(req, res, next) {
    Contact.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
