var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampaignSchema = Schema({
    title : {type : String, default: '', required: true},
    subject : {type : String, default: '', required: true},
    from: {type : String, default: '', required: true},
    list : { type: Schema.Types.ObjectId, ref: 'List' },
    content : {type : String, default: ''},
    participants : {type : Number, required: true},
    quantityOpened : {type : Number, default: 0, required: true},
    quantityLinked : {type : Number, default: 0, required: true},
    user : { type: Schema.Types.ObjectId, ref: 'User' }
});

var Campaign = mongoose.model('Campaign', CampaignSchema );

module.exports = Campaign;
