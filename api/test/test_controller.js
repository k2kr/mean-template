var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../user/user_model');
var Task = require('../task/task_model');
var app = express();
var router = express.Router();

var env = process.env.NODE_ENV || 'dev';
var options = require('../../config/config_' + env);

router.get('/db/setup', function(req, res){
	var karthik = new User({
		name: 'Karthik KR',
		password: 'dummy',
		roles: ['admin', 'user']
	});
	
	karthik.save(function(err){
		if (err)
		{
			return res.json({
				success:false,
				message:err.message
			});
		}
		
		res.json({
			success: true,
			message: 'User saved successfully'
		});
	});
});

module.exports = router;