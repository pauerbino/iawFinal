var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = require('../model/listModel.js');


router.get('/', function(req, res, next) {
  console.log("entree al get");
  List.find(function (err, lists) {
    if (err) return next(err);
    console.log(lists);
    res.json(lists);
  });
});

router.get('/:id', function(req, res, next) {
  List.findById(req.params.id).populate('contacts').exec(function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
  // List.findById(req.params.id, function (err, post) {
  //   if (err) return next(err);
  //   console.log("lista encontrada")
  //   console.log(post);
  //   post.populate();
  //   console.log("post populate");
  //   console.log(post);
  //   res.json(post);
  // });
});

router.post('/', function(req, res, next) {
  var contactsList = [] ;
  for(var c of req.body.contacts) {
    contactsList.push(c._id);
  }
  var newList = new List ({
      name : req.body.name,
      contacts : contactsList
  });
  newList.save(function(err) {
    if (err) throw err;
    console.log('New list saved successfully!');
    res.json(newList);
});
 // List.create(req.body, function (err, post) {
  //  if (err) return next(err);
  //  res.json(post);
  //});
});

router.put('/:id', function(req, res, next) {
  List.findByIdAndUpdate(req.params.id, req.body, function (err, put) {
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

// var express = require('express');
// var router = express.Router();
// var uuid = require('uuid/v4');
// var mongoose       = require('mongoose');

// var List = require('../model/listModel.js');

//     module.exports = function(app) {

//         app.get('/', function(req, res) {
//             console.log('fe');
//             List.find(function(err, lists) {

//                 if (err)
//                     res.send(err);

//                 res.json(lists);
//             });
//         });

//     };

// var lists = [
//             {
//                 name: 'List1',
//                 id: 1,
//                 contacts: [
//                     {
//                         id: 1,
//                         name: "John",
//                         lastName: "Mayer",
//                         username: "john.mayer",
//                         email: "johnmayer@gmail.com",
//                         phone: "4525792"
//                     },
//                     {
//                         id: 2,
//                         name: "Boris",
//                         lastName: "Grey",
//                         username: "boris.grey",
//                         email: "borisgrey@gmail.com",
//                         phone: "4525792"
//                     },
//                     {
//                         id: 3,
//                         name: "Emma",
//                         lastName: "Black",
//                         username: "emma.black",
//                         email: "emmablack@gmail.com",
//                         phone: "4525792"
//                     }
//                 ]
//             },{
//                 name: 'List2',
//                 id: 2,
//                 contacts: [
//                     {
//                         id: 1,
//                         name: "John",
//                         lastName: "Mayer",
//                         username: "john.mayer",
//                         email: "johnmayer@gmail.com",
//                         phone: "4525792"
//                     },
//                     {
//                         id: 2,
//                         name: "Boris",
//                         lastName: "Grey",
//                         username: "boris.grey",
//                         email: "borisgrey@gmail.com",
//                         phone: "4525792"
//                     },
//                     {
//                         id: 3,
//                         name: "Emma",
//                         lastName: "Black",
//                         username: "emma.black",
//                         email: "emmablack@gmail.com",
//                         phone: "4525792"
//                     }
//                 ]
//             }];

// var listById = {};

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
//     MongoClient.connect(url, function(err, db) {
//       if (err) throw err;
//       // console.log("Database created!");
//       var collection = db.createCollection("personas", function(err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         res.find({'nombre': 'paku'}).toArray(function(err, docs) {
//             console.dir(docs);
//             db.close();
//         });
//         db.close();
//       });
//     });
//     res.json(lists);
// });

// router.get('/:id', function(req, res, next) {
//   var id = req.params["id"];
//   //var list = listById[id];
//   var list = lists.filter(function(l){ return l.id == id;})
//   console.log(list);
//   if (list) {
//       res.json(list);
//   } else {
//       res.status(404).send("not found");
//   }
// });

// router.delete('/:id', function(req, res, next) {
//   var id = req.params["id"];
//   var list = listById[id];

//   if (list) {
//       delete listById[id];
//       lists.splice(lists.indexOf(list), 1)
//       res.json(list);
//   } else {
//       res.status(404).send("not found");
//   }

// });


// router.post('/', function(req, res, next) {
//    var list = req.body;
//    console.log(list);
//    list.id = uuid();
//    lists.push(list);
//    listById[list.id] = list;
//    res.send(list);
//  });

