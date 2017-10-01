var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

var lists = [
            {
                name: 'List1',
                id: 1,
                contacts: [
                    {
                        id: 1,
                        name: "John",
                        lastName: "Mayer",
                        username: "john.mayer",
                        email: "johnmayer@gmail.com",
                        phone: "4525792"
                    },
                    {
                        id: 2,
                        name: "Boris",
                        lastName: "Grey",
                        username: "boris.grey",
                        email: "borisgrey@gmail.com",
                        phone: "4525792"
                    },
                    {
                        id: 3,
                        name: "Emma",
                        lastName: "Black",
                        username: "emma.black",
                        email: "emmablack@gmail.com",
                        phone: "4525792"
                    }
                ]
            },{
                name: 'List2',
                id: 2,
                contacts: [
                    {
                        id: 1,
                        name: "John",
                        lastName: "Mayer",
                        username: "john.mayer",
                        email: "johnmayer@gmail.com",
                        phone: "4525792"
                    },
                    {
                        id: 2,
                        name: "Boris",
                        lastName: "Grey",
                        username: "boris.grey",
                        email: "borisgrey@gmail.com",
                        phone: "4525792"
                    },
                    {
                        id: 3,
                        name: "Emma",
                        lastName: "Black",
                        username: "emma.black",
                        email: "emmablack@gmail.com",
                        phone: "4525792"
                    }
                ]
            }];

var listById = {};

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


router.get('/', function(req, res, next) {
  res.json(lists);
});

router.get('/:id', function(req, res, next) {
  var id = req.params["id"];
  var list = listById[id];
  if (list) {
      res.json(list);
  } else {
      res.status(404).send("not found");
  }
});

router.delete('/:id', function(req, res, next) {
  var id = req.params["id"];
  var list = listById[id];

  if (list) {
      delete listById[id];
      lists.splice(lists.indexOf(list), 1)
      res.json(list);
  } else {
      res.status(404).send("not found");
  }

});


// router.post('/', function(req, res, next) {
//   var contact = req.body;
//   contact.id = uuid();
//   contacts.push(contact);
//   contactsById[contact.id] = contact;
//   res.send(contact);
// });

module.exports = router;
