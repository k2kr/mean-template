var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require('../task/task_model');

var user_model = mongoose.model('User', new Schema({
	name: String,
	password: String,
	roles: [{type: String, enum:['admin', 'manager', 'user', 'service']}],
	observing_tasks: [{type:Schema.ObjectId, ref:'Task'}],
	active_tasks: [{type:Schema.ObjectId, ref:'Task'}],
}));

module.exports = user_model;