function authService($window){
	var self = this;
	
	self.parseToken = function(token){
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse($window.atob(base64));
	};
	
	self.saveToken = function(token){
		$window.localStorage['jwtToken'] = token;
	};
	
	self.getToken = function()
	{
		return $window.localStorage['jwtToken'];
	}
	
	self.isAuthenticated = function(){
		var token = self.getToken();
		
		if(token)
		{
			var params = self.parseToken(token);
			var auth = Math.round(new Date().getTime() / 1000) <= params.exp;
			return auth;
		}
		else
		{
			return false;
		}
	};
	
	self.logout = function(){
		$window.localStorage.removeItem('jwtToken');
	};
}

function userService($http, auth)
{
	var self = this;
	
	self.register = function(username, password)
	{
		self.logout();
		return $http.post('/register', {
			username: username,
			password: password
		});
	};
	
	self.login = function(username, password)
	{
		self.logout();
		return $http.post('/login', {
			username: username,
			password: password
		});
	}
	
	self.logout = function()
	{
		auth.logout && auth.logout();
	}
	
	self.getUserInfo = function(){
		return $http.get('/api/user');
	};
}

app.service('user', userService)
   .service('auth', authService);