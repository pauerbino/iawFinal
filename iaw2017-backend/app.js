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
// hacemos referencia a la dependencia 
//var mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/unTestDB";

// obtenemos el server MongoDB que dejamos corriendo
// *** el puerto 27017 es el default de MongoDB
//var server = new mongodb.Server("127.0.0.1", 27017, {});

// obtenemos la base de datos de prueba que creamos
//var dbTest = new mongodb.Db("unTestDB", server, {})

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  //var collection = new MongoClient.Collection(db, "personas");
  var collection = db.createCollection("personas", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    res.find({'nombre': 'paku'}).toArray(function(err, docs) {

    	//imprimimos en la consola el resultado
    	console.dir(docs);
  		db.close();
	});
    db.close();
  });
  
  //disparamos un query buscando la persona que habiamos insertado por consola
  //	collection.find({'nombre': 'pau'}).toArray(function(err, docs) {

    	//imprimimos en la consola el resultado
  //  	console.dir(docs);
  	//	db.close();
	//});
});

// abrimos la base pasando el callback para cuando esté lista para usar
//dbTest.open(function (error, client) {
 // if (error) throw error;

  //en el parámetro client recibimos el cliente para comenzar a hacer llamadas
  //este parámetro sería lo mismo que hicimos por consola al llamar a mongo
  
  //Obtenemos la coleccion personas que creamos antes
  //var collection = new mongodb.Collection(client, "personas");
  
  //disparamos un query buscando la persona que habiamos insertado por consola
  //collection.find({'nombre': 'pau'}).toArray(function(err, docs) {

    //imprimimos en la consola el resultado
    //console.dir(docs);
  //});
//});

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
