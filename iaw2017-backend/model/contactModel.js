var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = Schema({
    name : {type : String, default: '', required: true},
    lastName : {type : String, default: '', required: true},
    email : {type : String, default: '', required: true},
    phone : {type : Number, required: true},
    etiquetas: [String]
});

var Contact = mongoose.model('Contact', ContactSchema );

module.exports = Contact;
