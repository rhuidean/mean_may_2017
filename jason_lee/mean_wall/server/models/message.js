var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
		// reference another model
	},

	message: {
		type: String,
		required: [true, 'Message cannot be blank'],
	},

	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
		// reference another model on one to many relationships
	}]
}, { timestamps: true})

// register the Message model
mongoose.model('Message',MessageSchema);

