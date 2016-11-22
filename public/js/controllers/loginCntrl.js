function loginCntrl(user, auth){
	var self = this;

	function handleRequest(res) {
		if(res.data.message)
		{
			self.message = res.data.message;
			if(res.data.success)
			{
				user.getUserInfo().then(handleRequest, handleRequest);
			}
		}
		else
		{
			self.userInfo = res.data;
		}
	}

	self.login = function() {
		user.login(self.username, self.password)
		  .then(handleRequest, handleRequest);
	}
	
	self.register = function() {
		user.register(self.username, self.password)
		  .then(handleRequest, handleRequest);;
	}
	
	self.logout = function() {
		self.message = "Come back soon!";
		user.logout();
	}
	
	self.isAuthed = function() {
		return auth.isAuthenticated ? auth.isAuthenticated() : false;
	}
	
	if(self.isAuthed())
	{
		self.message = "Welcome back!";
		user.getUserInfo().then(handleRequest, handleRequest);
	}
	else
	{
		self.message = "Please login...";
	}
}

app.controller('Login', loginCntrl);