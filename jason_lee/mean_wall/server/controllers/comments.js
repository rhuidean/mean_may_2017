var mongoose = require("mongoose");

// Import the relevant models
var Message = mongoose.model('Message');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');

// export to CRUD
module.exports = {
	index: function(req,res){
		Comment.find({}, function(err,comments){
			if(err){
				return res.json(err);
			}
			return res.json(comments)
		})
	},

	// create comment
	// find message & manipulate it
	// find user & manipuate it
	// save comment
	create: function(req,res){
		// prepackaged req.body
		Comment.create(req.body,function(err,comment){
			if(err){
				return res.json(err);
			}

			// comment table expect message id
			Message.findById(req.body.message,function(err,message){
				if(err){
					return res.json(err);
				}
				// push created comment._id to related message
				message.comments.push(comment._id);
				message.save(function(err,message){
					if(err){
						return res.json(err);
					}
					User.findById(req.body.user,function(err,user){
						if(err){
							return res.json(err);
						}
						user.comments.push(comment._id);
						user.save(function(err,user){
							if(err){
								return res.json(err);
							}
							return res.json(comment);
						})
					})
				})
			})
		})
	}
}