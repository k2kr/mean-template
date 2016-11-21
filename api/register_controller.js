var express = require('express');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var User = require('./user/user_model');
var auth = require('./user-auth');
var router = express.Router();

var env = process.env.NODE_ENV || 'dev';
var options = require('../config/config_' + env);

router.use(auth.validate)
router.post('/', function(req, res){
	User.findOne({username: req.body.username}, function(err, result){
		if (!result)
		{
			var newUser = new User({
				username: req.body.username,
				password: passwordHash.generate(req.body.password),
				roles: 'user'
			});
			
			newUser.save();
			var tokenUser = {username: newUser.username, roles: newUser.roles};;
			
			var token = jwt.sign(tokenUser, options.auth.secret,{
				expiresIn: '30 days'
			});
			
			res.set({
				'x-access-token': token
			});
		
			return res.json({
				success: true,
				message: 'New user registered!',
			});
		}
		
		return res.json({
			success: false,
			message: 'User already exists',
		});
	});
});

module.exports = router;