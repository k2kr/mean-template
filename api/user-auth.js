var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var User = require('./user/user_model');
var ldap = require('ldapjs');

var env = process.env.NODE_ENV || 'dev';
var options = require('../config/config_' + env);

function validate(req, res, next)
{
	if (!req.body.username)
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
	
	next();
};

function db_auth(username, password, callback)
{
	User.findOne({username: username}, function(err, result){
		if (err) 
		{
			callback({success: false, message: err});
		} 
		else if(!result)
		{
			callback({success: false, message: 'No such user exists.'});
		}
		else if(!passwordHash.verify(password, result.password))
		{
			callback({success: false, message: 'Invalid password.'});
		}
		else
		{
			var token = jwt.sign({username:result.username, roles:result.roles}, options.auth.secret,{
				expiresIn: '30 days'
			});
			
			callback({
				success: true, 
				message: 'Welcome back!', 
				token: token
			});
		}
	});
};

function ldap_auth(username, password, callback)
{
	var bind_dn = options.ldap.bind_dn(username);
	// Need this because ldap can use self-signed SSL certs. 
	// Need to prevent authentication errors.
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; 

	var client = ldap.createClient({
		url: options.ldap.url
	});
	
	client.bind(bind_dn, password, function(err){
		client.unbind();
		
		if(err)
		{
			callback({
				success: false,
				message: 'Invalid credentials',
			});
			
			return;
		}
		
		var newUser = new User({
			username: username,
			roles: 'user'
		});
		
		User.findOne({username: username}, function(err, result){
			var tokenUser = {};
			if (result)
			{
				tokenUser = {username: result.username, roles: result.roles};
			} 
			else 
			{
				var newUser = new User({
					username: username,
					roles: 'user'
				});
				
				newUser.save();
				tokenUser = {username: newUser.username, roles: newUser.roles};
			}
			
			var token = jwt.sign(tokenUser, options.auth.secret,{
				expiresIn: '30 days'
			});
			
			callback ({
				success: true,
				message: 'Welcome back!',
				token: token
			});
		});
	});
};

module.exports.validate = validate;
module.exports.db_auth = db_auth;
module.exports.ldap_auth = ldap_auth;