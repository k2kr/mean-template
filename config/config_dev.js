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

config.ldap = {
	url: 'ldaps://qed-ldap.qualcomm.com:636',
	bind_dn: function(username){
		return 'uid=' + username + ', ou=people, dc=qualcomm, dc=com';
	}
}

config.db = {
	host: 'mongodb://localhost/dev'
}

config.controllers = {
	open:[
		{
			url: '/login',
			path: './api/login_controller'
		},
		{
			url: '/register',
			path: './api/register_controller'
		}
	],
	secured:[
		{
			url: '/api/user',
			path: './api/user/user_controller'
		},
		{
			url: '/api/task',
			path: './api/task/task_controller'
		}
	]
}

config.static_folder = 'public'

module.exports = config;