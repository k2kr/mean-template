var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require('../task/task_model');

var user_model = mongoose.model('User', new Schema({
	name: {
		type: String, 
		unique: true,
		required: true
	},
	roles: [{
		type: String, 
		enum:['admin', 'manager', 'user', 'service', 'test']
	}],
	observing_tasks: [{
		type:Schema.ObjectId, 
		ref:'Task'
	}],
	active_tasks: [{
		type:Schema.ObjectId, 
		ref:'Task'
	}],
}, {strict: true}));

module.exports = user_model;