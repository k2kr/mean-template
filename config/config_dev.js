var fs = require('fs')
var config = {};

config.ports = {
	http: 8080,
	https: 8443
}

config.auth = {
	key: fs.readFileSync('./auth/keys/localhost.key'),
	cert: fs.readFileSync('./auth/certs/localhost.cert'),
	secret: 'myfirstsite_secret',
}

config.db = {
	host: 'mongodb://localhost/mysite'
}

config.controllers = [
	{
		url: '/login',
		path: './api/login/login_controller'
	},
	{
		url: '/user',
		path: './api/user/user_controller'
	},
	{
		url: '/task',
		path: './api/task/task_controller'
	},
	{
		url: '/test',
		path: './api/test/test_controller'
	}
]

config.static_folder = 'public'

module.exports = config;