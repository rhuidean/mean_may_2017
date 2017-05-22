app.controller('UsersController',function(UserFactory){
	console.log('Initializing UsersController ...');
	var self = this;
	self.users = [];
	self.errors= [];
	self.index = function(){
		UserFactory.index(function(res){
			console.log(res);
			self.users = res.data;
		})
	}
	self.create = function(newUser){
		UserFactory.create(newUser, function(res){
			self.newUser = {};
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key]
					self.errors.push(error.message)
				}
			} else{
				self.index();
			}
		})
	}
})