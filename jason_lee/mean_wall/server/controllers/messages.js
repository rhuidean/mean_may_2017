var mongoose = require("mongoose");

// import relevant models
var Message = mongoose.model('Message');
var User = mongoose.model('User');

// export objects
module.exports ={
	index: function(req, res){
		//
		Message.find({}).populate('user').populate('comments').exec(function(err,messages){
			if(err){
				return res.json(err);
			}
			return res.json(messages);
		})
	},

	create: function(req,res){
		// console.log(req.body);
		Message.create(req.body,function(err,message){
			if(err){
				return res.json(err);
			}
			User.findById(req.body.user, function(err,user){
				if(err){
					return res.json(err)
				}
				user.messages.push(message._id)
				user.save(function(err,user){
					if(err){
						return res.json(err)
					}
				})
				return res.json(message);
			})
		})
	},

	show: function(){
		
	}
};

