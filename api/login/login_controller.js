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
	User.findOne({
		name: req.body.name
	}, function(err, user){
		if(err) throw err;
		
		if(!user){
			res.json({success:false, message: 'Authentication failed. Username not found.'});
		} else if (user)
		{
			if(user.password != req.body.password)
			{
				res.json({success: false, message: 'Authentication failed. Incorrect password.'});
			}
			else
			{
				var token = jwt.sign(user, options.auth.secret,{
					expiresIn: '1d'
				});
				
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

module.exports = router;