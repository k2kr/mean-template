app.controller('login_controller', function($scope, $http, $window){
	$scope.username = "username";
	$scope.password = "password";
	$scope.status = "init";
	
	$scope.register = function(){
		$window.localStorage.removeItem('jwtToken');
		$http
			.post('/register', {username: $scope.username, password: $scope.password})
			.then(self.showUserInfo);
		
	};
	
	$scope.login = function(){
		$window.localStorage.removeItem('jwtToken');
		$http
			.post('/login', {username: $scope.username, password: $scope.password})
			.then(self.showUserInfo);
	};
	
	showUserInfo = function(response)
	{
		if(response.data.success)
		{
			$http.get('/api/user').then(function(res){
				$scope.status = res.data;
			});
		}
		else
		{
			$scope.status = response.data;
		}
	}
	
});