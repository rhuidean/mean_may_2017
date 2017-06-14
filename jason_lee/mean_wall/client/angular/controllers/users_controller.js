app.controller('UsersController',function(UserFactory,$cookies,$location){
	console.log('initializing UsersController...');
	var self = this;
	self.registration_errors = [];
	self.login_errors = [];

	self.session = function(){
		console.log('session function')
		UserFactory.session(function(user){
			console.log(user);
		});

	}

	self.logout = function(){
		$cookies.remove('user_id');
	}

	self.login = function(loginUser){
		UserFactory.login(loginUser,function(res){
			if(res.data.errors){
				for (key in res.data.errors) {
					var error = res.data.errors[key];
					self.login_errors.push(error.message);
				} 
			} else {
				$cookies.put('user_id',res.data._id);
				$location.url('/dashboard');
			}
		})
	}

	// watch for error in {} and 
	self.create = function(newUser) {
		console.log('newUser', newUser);
		UserFactory.create(newUser,function(res){
			console.log(res);
			if(res.data.errors){
				for (key in res.data.errors) {
					var error = res.data.errors[key];
					self.registration_errors.push(error.message);
				}
			} else {
				// save the user into session
				var user_id = res.data._id;
				$cookies.put('user_id',user_id);
				$location.url('/dashboard')
				// redirect to the next part of our app
			}
		})
	}
})