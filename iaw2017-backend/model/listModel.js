var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
    name : {type : String, default: ''}
});

module.exports = mongoose.model('List', ListSchema);
