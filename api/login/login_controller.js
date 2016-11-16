var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../user/user_model');
var app = express();
var router = express.Router();

var env = process.env.NODE_ENV || 'dev';
var options = require('../../config/config_' + env);

router.get('/', function (req, res){
	res.send('Show a login page here');
});
router.post('/', function(req, res){
	if (!req.body.name)
	{
		return res.json({
			success:false,
			message: 'Authentication failed. Username not provided.'
		});
	}
	
	if (!req.body.password)
	{
		return res.json({
			success:false,
			message: 'Authentication failed. Password not provided.'
		});
	}
	
	User.findOne({name: req.body.name}, function(err, user){
		if(err) throw err;
		
		if(!user){
			return res.json({
				success:false, 
				message: 'Authentication failed. Username not found.', 
				name: req.body.name
			});
		}  
		
		if(user.password != req.body.password)
		{
			return res.json({
				success: false, 
				message: 'Authentication failed. Incorrect password.',
				name: req.body.name
			});
		}
		
		var token = jwt.sign(user, options.auth.secret,{
			expiresIn: '30d'
		});
		
		return res.json({
			success: true,
			message: 'Enjoy your token!',
			token: token
		});
	});
});

module.exports = router;