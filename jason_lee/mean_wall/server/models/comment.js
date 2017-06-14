var mongoose = require("mongoose");

// Specification for model inputs
var CommentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	comment: {
		type: String,
		required: [true, 'Comment cannot be blank.']
	},

	message: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	}
}, { timestamps: true});

mongoose.model('Comment', CommentSchema);