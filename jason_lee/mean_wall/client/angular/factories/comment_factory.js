console.log('commentFAcotyr')
app.factory('CommentFactory',function($http){
	var factory = {};

	//input get callback, hit the route //
	factory.create = function(newComment, callback){
		$http.post('/comments',newComment).then(callback);
	}

	return factory;
})