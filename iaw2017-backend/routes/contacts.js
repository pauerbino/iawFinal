var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = require('../model/contactModel.js');


router.get('/', function(req, res, next) {
  console.log("entree al get");
  Contact.find(function (err, contacts) {
    if (err) return next(err);
    console.log(contacts);
    res.json(contacts);
  });
});

router.get('/:id', function(req, res, next) {
  Contact.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', function(req, res, next) {
//   var newList = new List ({
//       name : 'Pepeeee'
//   });
//   console.log(newList);
//   console.log(req.body);
//   newList.save(function(err) {
//     if (err) throw err;
//     console.log('User saved successfully!');
// });
 // List.create(req.body, function (err, post) {
  //  if (err) return next(err);
  //  res.json(post);
  //});
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


// var express = require('express');
// var router = express.Router();
// var uuid = require('uuid/v4');

// var contacts = [
//             {
//                 id: 1,
//                 name: "John REST",
//                 lastName: "Mayer REST",
//                 username: "john.mayer",
//                 email: "johnmayer@gmail.com",
//                 phone: "4525792"
//             },
//             {
//                 id: 2,
//                 name: "Boris",
//                 lastName: "Grey",
//                 username: "boris.grey",
//                 email: "borisgrey@gmail.com",
//                 phone: "4525792"
//             }];

// var contactsById = {};

// router.put('/:id', function(req, res, next) {
//   var updatedContact = req.body;
  
//   var id = req.params["id"];    
//   var contact = contactsById[id];
//   if (contact) {
//       contact.name = updatedContact.name;
//       res.json(contact);
//   } else {
//       res.status(404).send("not found");
//   }
// });


// router.get('/', function(req, res, next) {
//   res.json(contacts);
// });

// router.get('/:id', function(req, res, next) {
//   var id = req.params["id"];    
//   var contact = contactsById[id];
//   if (contact) {
//       res.json(contact);
//   } else {
//       res.status(404).send("not found");
//   }
// });

// router.delete('/:id', function(req, res, next) {
//   var id = req.params["id"];    
//   var contact = contactsById[id];
  
//   if (contact) {
//       delete contactsById[id];
//       contacts.splice(contacts.indexOf(contact), 1)
//       res.json(contact);
//   } else {
//       res.status(404).send("not found");
//   }
  
// });


// router.post('/', function(req, res, next) {
//   var contact = req.body;
//   contact.id = uuid();
//   contacts.push(contact);
//   contactsById[contact.id] = contact;
//   res.send(contact);
// });

// module.exports = router;
