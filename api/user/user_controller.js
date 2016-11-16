var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('./user_model');
var router = express.Router();

var env = process.env.NODE_ENV || 'dev';
var options = require('../../config/config_' + env);

router.get('/setup', function(req, res){
	var karthik = new User({
		name: 'Karthik KR',
		password: 'dummy',
		roles: ['admin', 'user']
	});
	
	karthik.save(function(err){
		if (err) throw err;
		
		console.log("User saved successfully");
		res.json({success: true});
	});
});
router.use(function authenticate (req, res, next){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	if (token) {
		jwt.verify(token, options.auth.secret, function(err, decoded) {      
		if (err) {
			return res.json({ 
				success: false,
				message: 'Failed to authenticate token.' 
			});    
		} else {
			// if everything is good, save to request for use in other routes
			req.decoded = decoded;    
			next();
		}
		});
	} else {
		return res.status(403).json({
			success: false,
			message: "Access Denied. No json web token provided."
		});
	}
});
router.get('/', function(req, res){
	User.find({name: req.decoded._doc.name}, function(err, users){
		res.json(users);
	});
});
router.post('/', function(req, res){
	if (req.body.name)
	{
		res.send("Register user with username " + req.body.username);
	}
	else if(req.query.name)
	{
		res.send("Register user with username " + req.query.username);
	}
	else
	{
		res.status(400).send("Bad request. Need a username.");
	}
});

module.exports = router;

