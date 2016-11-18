// Import dependencies
var http = require('http');
var https = require('https');
var forceSSL = require('express-force-ssl');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var token_auth = require('./auth/token-auth');

// Initialize environment and db
var app = express();
var env = process.env.NODE_ENV || 'dev';
var options = require('./config/config_' + env);

console.log('');
console.log("Environment = " + env);
mongoose.connect(options.db.host);

// Set express options
app.set('forceSSLOptions', {
	enable301Redirects: true,
	trustXFPHeader: false,
	httpsPort: options.ports.https,
	sslRequiredMessage: 'SSL Required'
});

// Build middleware
app.use(forceSSL);
app.use(express.static(options.static_folder));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
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

// Build endpoints
for(var i = 0; i < options.controllers.open.length; i++)
{
	var controller = options.controllers.open[i];
	console.log("Open: " + controller.url + " -> " + controller.path);
	app.use(controller.url, require(controller.path));
}
app.use(token_auth);
for(var i = 0; i < options.controllers.secured.length; i++)
{
	var controller = options.controllers.secured[i];
	console.log("Secured: " + controller.url + " -> " + controller.path);
	app.use(controller.url, require(controller.path));
}

// Start the servers
https.createServer(options.auth, app).listen(options.ports.https);
http.createServer(app).listen(options.ports.http);

console.log('');
console.log('Listening on http://localhost:' + options.ports.http);
console.log('Listening on https://localhost:' + options.ports.https);