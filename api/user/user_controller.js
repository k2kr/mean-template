var express = require('express');
var router = express.Router();

router.use(function authenticate (req, res, next){
	console.log('authenticating...');
	next();
});
router.get('/', function(req, res){
	if(req.query.id)
	{
		res.send('Return user based on id ' + req.query.id);
	}
	else if(req.query.username)
	{
		res.send('Return user based on username ' + req.query.username);
	}
	else
	{
		res.send('Returning all users');
	}
});
router.post('/', function(req, res){
	if (req.body.username)
	{
		res.send("Register user with username " + req.body.username);
	}
	else if(req.query.username)
	{
		res.send("Register user with username " + req.query.username);
	}
	else
	{
		res.status(400).send("Bad request. Need a username.");
	}
});

module.exports = router;

