function httpInterceptor($window){
	return{
		
	request: function(config) {
		if($window.localStorage['jwtToken'])
		{
			config.headers["x-access-token"] = $window.localStorage['jwtToken']
		}

		app.outgoing = config;
		return config;
	},
	
	requestError: function(config) {
		return config;
	},
	
	response: function(config) {
		if(config.headers()["x-access-token"])
		{
			$window.localStorage['jwtToken'] = config.headers()["x-access-token"]
		}
		app.incoming = config;
		return config;
	},
	
	responseError: function(config) {
		return config;
	},
	
	};
};

var app = angular.module('app', [])
	.factory('httpInterceptor', httpInterceptor)
	.config(function($httpProvider){
		$httpProvider.interceptors.push('httpInterceptor');
	});