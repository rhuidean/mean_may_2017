var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
	index: function(req,res){
		User.find({}, function(err,users){
			if(err){
				return res.json(err);
			}
			return res.json(users);
		})
	},

	create: function(req,res) {
		console.log(req.body)
		User.create(req.body, function(err,user){
			if(err){
				return res.json(err);
			}
			return res.json(user);
		})
	},

	login: function(req,res){
		// look up the email and return an object
		User.findOne({email: req.body.email}, function(err,user){
			if(err){
				return res.json(err);
			}

			// check for null, and authenticate the password
			if(user && user.authenticate(req.boy.password)){
				return res.json(user)
			}

			// bad credentials
			return res.json({
				"errors": {
					"password": {
						"message" : "Invalid credentials."
					}
				}
			})
		})
	},

	show: function(req,res){
		User.findById(req.params.id).exec(function(err,user){
			if(err){
				return res.json(err);
			}
			if(!user){
				return res.json({
					"errors": "404 - User not found!"
				})
			}
			return res.json(user);
		})
	},
}