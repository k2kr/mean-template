var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('./user_model');
var router = express.Router();

var env = process.env.NODE_ENV || 'dev';
var options = require('../../config/config_' + env);

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
	User.findOne({name: req.decoded.name}, function(err, users){
		res.json(users);
	});
});

module.exports = router;

