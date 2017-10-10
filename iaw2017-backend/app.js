var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(cors());

var contacts = require('./routes/contacts');
var lists = require('./routes/lists');
var campaigns = require('./routes/campaigns');

//var app = express();

app.use('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/contacts', contacts);
app.use('/api/v1/lists', lists);
app.use('/api/v1/campaigns', campaigns);

module.exports = app;
