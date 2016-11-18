var express = require('express');
var jwt = require('jsonwebtoken');
var Task = require('./task_model');
var router = express.Router();

var env = process.env.NODE_ENV || 'dev';
var options = require('../../config/config_' + env);

router.get('/', function(req, res){
	if(req.query.id)
	{
		res.send('Return task based on id ' + req.query.id);
	}
	else if(req.token.name)
	{
		res.send('Return all tasks belonging to ' + req.token.name);
	}
	else
	{
		res.send('Returning all tasks');
	}
});
router.post('/', function(req, res){
	if (req.token.name)
	{
		res.send("Register new task for user " + req.token.name);
	}
	else
	{
		res.status(400).send("Bad request. Need a user to own this task.");
	}
});

module.exports = router;