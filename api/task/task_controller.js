var express = require('express');
var jwt = require('jsonwebtoken');
var Task = require('./task_model');
var router = express.Router();

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
	if(req.query.id)
	{
		res.send('Return task based on id ' + req.query.id);
	}
	else if(req.query.username)
	{
		res.send('Return all tasks belonging to ' + req.query.username);
	}
	else
	{
		res.send('Returning all tasks');
	}
});
router.post('/', function(req, res){
	if (req.body.username)
	{
		res.send("Register new task for user " + req.body.username);
	}
	else if(req.query.username)
	{
		res.send("Register new task for user " + req.query.username);
	}
	else
	{
		res.status(400).send("Bad request. Need a user to own this task.");
	}
});

module.exports = router;