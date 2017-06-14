console.log('messagescontroller')
app.controller('MessagesController',function(UserFactory,MessageFactory, CommentFactory){
	console.log("initializing MessagesController...");

	var self = this;
	self.messages = [];
	self.new_message_errors= [];
	self.newMessage={};

	self.index = function(){
		MessageFactory.index(function(res){
			self.messages = res.data;
			console.log(self.messages);
		})

	}

	self.createComment = function(newComment,index,message_id){
		// console.log("index: ",index);
		newComment = newComment[index];
		newComment.message=message_id;
		// get user from session and assign newComment user //
		UserFactory.session(function(user){
			newComment.user=user._id;
			console.log(newComment);
			CommentFactory.create(newComment,function(res){
				self.index();
			})
		})
		console.log(newComment);
		// console.log(newComment);
		//clear out newComment object //
		// self.newComment={};
		//attach messsage id and user //
	}

	self.create = function(newMessage){
		UserFactory.session(function(user){
			newMessage.user = user._id;
			MessageFactory.create(newMessage,function(res){
				if(res.data.errors){
					for (key in res.data.errors){
						var error = res.data.errors[key];
						self.new_message_errors.push(error.message);
						console.log(self.new_message_errors);
					}
				} else {
					self.index();
				}
			});
		})
	}
})