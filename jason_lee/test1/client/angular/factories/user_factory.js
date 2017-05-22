app.factory('UserFactory',function($http){
	var factory = {};

	factory.index = function(callback){
		$http.get('/users').then(callback);
	}

	factory.create = function(newUser){
		$http.post('/users',newUser).then(callback);
	}

	return factory;
})