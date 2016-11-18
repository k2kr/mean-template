var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('./user_model');
var router = express.Router();

var env = process.env.NODE_ENV || 'dev';
var options = require('../../config/config_' + env);

router.get('/', function(req, res){
	User.findOne({name: req.token.name}, function(err, users){
		res.json(users);
	});
});

module.exports = router;

