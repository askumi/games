/**
 * Created by RFreeman on 10/6/2016.
 */
var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
    username: String
});

accountSchema.plugin(plm);
module.exports = mongoose.model('Account', accountSchema);