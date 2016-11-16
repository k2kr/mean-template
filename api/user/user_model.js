var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_model = mongoose.model('User', new Schema({
	name: String,
	password: String,
	roles: [Number]
}));

module.exports = user_model;