var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../user/user_model');
var ldap = require('ldapjs');
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
	
	var bind_dn = 'uid=' + req.body.name + ', ou=people, dc=qualcomm, dc=com'
	// Need this because ldap can use self-signed SSL certs. 
	// Need to prevent authentication errors.
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; 

	var client = ldap.createClient({
		url: 'ldaps://qed-ldap.qualcomm.com:636'
	});
	
	client.bind(bind_dn, req.body.password, function(err){
		client.unbind();
		
		if (err)
		{
			return res.json({
				success:false, 
				message: 'Invalid credentials', 
				name: req.body.name
			});
		}

		var newUser = new User({
			name: req.body.name,
			roles: 'user'
		});
		
		User.findOne({name: req.body.name, roles: 'user'}, function(err, result){
			var tokenUser;
			if (!result)
			{
				var newUser = new User({
					name: req.body.name,
					roles: 'user'
				});
				
				newUser.save();
				tokenUser = {name: newUser.name, roles: newUser.roles};
			}
			else 
			{
				if(result.roles.indexOf('user') < 0)
				{
					result.roles.push('user');
					result.save();
				}
				tokenUser = {name: result.name, roles: result.roles};
			}
			
			var token = jwt.sign(tokenUser, options.auth.secret,{
				expiresIn: '30 days'
			});
		
			return res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			});
		});
	});
});

module.exports = router;