var fs = require('fs')
var config = {};

config.ports = {
	http: 8080,
	https: 8443
}

config.auth = {
	key: fs.readFileSync('./auth/keys/localhost.key'),
	cert: fs.readFileSync('./auth/certs/localhost.cert')
}

config.controllers = [
	{
		url: '/user',
		path: './api/user/user_controller'
	},
	{
		url: '/task',
		path: './api/task/task_controller'
	}
]

config.static_folder = 'public'

module.exports = config;