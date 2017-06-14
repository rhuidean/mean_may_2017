console.log('MessageFactory')
app.factory('MessageFactory',function($http){
	var factory = {};

	factory.create = function(newMessage, callback){
		$http.post('/messages',newMessage).then(callback);
	}

	factory.index = function(callback){
		$http.get('/messages').then(callback);
	}

	return factory;
})