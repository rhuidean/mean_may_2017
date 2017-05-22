var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports ={
	index: function(req,res) {
		User.find({}).exec(function(err,users){
			if(err){
				return res.json(err);
			}
			return res.json(users);
		})
	},
	create: function(req,res){
		//the .save way
		// var user = new User(req.body);
		// user.save(function(err.user){
		// 	if(err){
		// 		return res.json(err);
		// 	}
		// 	return res.json(user);
		// })
		//the .create way
		User.create(req.body,function(err,user){
			if(err){
				return res.json(err);
			}
			return res.json(user);
		})
	},
	show: function(req,res) {
		User.findById(req.params.id, function(err,user){
			if(err){
				return res.json(err);
			}
			if(!user){
				return res.json({
					"errors":  "404 - User not found!"
				})
			}
			return res.json(user);
		})
	},
	update: function(req,res){
		// the .save way
		// User.findById(req.params.id,function(err,user){
		// 	if(err){
		// 		return res.json(err);
		// 	}
		// 	if(!user){
		// 		return res.json({
		// 			"errors": "404 - User not found!"
		// 		})
		// 	}
		// 	user.email = req.body.email;
		// 	user.save(function(err,user){
		// 		if(err){
		// 			return res.json(err);
		// 		}
		// 		return res.json(user);
		// 	})
		// })

		// the .findByIdAndUpdate way
		User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true},function(err,user){
			if(err){
				return res.json(err);
			}
			if(!user){
				return res.json({
					"errors": "404 - Uesr not found!"
				})
			}
			return res.json(user);
		})
	},
	destroy: function(req,res){
		User.findByIdAndRemove(req.params.id,function(err,user){
			if(err){
				return res.json(err);
			}
			return res.json(user);
		})
	}
};