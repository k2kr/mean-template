//-------------------------------------------------------------
console.log("Loading global dependencies...");
var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var morgan = require('morgan');
var app = express();
//-------------------------------------------------------------
console.log("Loading local dependencies...");
var env = process.env.NODE_ENV || 'dev';
console.log("\tEnvironment = " + env);
var options = require('./config/config_' + env);
var user = require('./api/user/user_model');
//-------------------------------------------------------------
console.log("Connecting to database...");
mongoose.connect(options.db.host);
//-------------------------------------------------------------
console.log("Loading middle-ware...");
console.log("\tLoading redirect...");
app.use(function(req, res, next){
	if (req.secure) next();
	else res.redirect('https://' + req.hostname + ":" + options.ports.https + req.originalUrl);
});
console.log("\tServing static files from " + options.static_folder + " folder...")
app.use(express.static(options.static_folder));
console.log("\tLoading body parser...")
app.use(bodyParser.json());
console.log("\tLoading url encoder/decoder...")
app.use(bodyParser.urlencoded({ extended: true }));
console.log("\tLoading Morgan logger...")
app.use(morgan('dev'));
console.log("\tAdding error catch block to filter bad requests...")
app.use(function(err, req, res, next)
{
	if(!err)
	{
		next();
	}
	else
	{
		res.status(400).send("Bad request: " + err);
	}
});
//-------------------------------------------------------------
console.log('Loading endpoints...');
app.get('/', function (req, res){
	res.send('hello world!');
});
for(var i = 0; i < options.controllers.length; i++)
{
	var controller = options.controllers[i];
	console.log('\t' + controller.url + " -> " + controller.path);
	app.use(controller.url, require(controller.path));
}
//-------------------------------------------------------------
console.log('Starting server(s)...');
https.createServer(options.auth, app).listen(options.ports.https);
console.log('\tStarted HTTPS server (https://localhost:' + options.ports.https + ')');
http.createServer(app).listen(options.ports.http);
console.log("\tStarted HTTP server (http://localhost:" + options.ports.http + ")")