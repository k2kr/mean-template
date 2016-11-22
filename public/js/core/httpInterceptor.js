function httpInterceptor(auth){ 
	return{
		
		request: function(config) {
			if (auth.isAuthenticated())
			{
				config.headers['x-access-token'] = auth.getToken();
			}
			
			if(!app.debug)
			{
				app.debug = {lastRequest: config};
			}
			else
			{
				app.debug['lastRequest'] = config;
			}

			return config;
		},
		
		response: function(res) {
			if(res.headers()['x-access-token'])
			{
				auth.saveToken(res.headers()['x-access-token']);
			}
			
			if(!app.debug)
			{
				app.debug = {lastResponse: res};
			}
			else
			{
				app.debug['lastResponse'] = res;
			}
			
			return res;
		},
	};
};

app.factory('httpInterceptor', httpInterceptor)
   .config(function($httpProvider){
		$httpProvider.interceptors.push('httpInterceptor');
	})