var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var task_model = mongoose.model('Task', new Schema({
	name: String,
	description: String,
	status: {type: String, enum:['planning', 'active', 'completed']},
	createdOn: Date,
	completedOn: Date,
	parent: {type:Schema.ObjectId, ref:'Task'},
	children: [{type:Schema.ObjectId, ref:'Task'}]
}));

module.exports = task_model;