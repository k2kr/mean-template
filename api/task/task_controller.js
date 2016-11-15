var express = require('express');
var router = express.Router();

router.use(function authenticate (req, res, next){
	console.log('authenticating...');
	next();
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