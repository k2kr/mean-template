var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('./user/user_model');
var auth = require('./user-auth');
var router = express.Router();

var env = process.env.NODE_ENV || 'dev';
var options = require('../config/config_' + env);

router.use(auth.validate);
router.post('/', function(req, res){
	auth.db_auth(req.body.username, req.body.password, function(result){
		if(result.token)
		{
			res.set({
				'x-access-token': result.token
			});
			
			delete result.token;
		}
		
		return res.json(result);
	});
});

module.exports = router;