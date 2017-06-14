var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name field cannot be blank."]
	},

	email: {
		type: String,
		required: [true, "Email cannot be blank."]
	},

	password: {
		type: String,
		required: [true, "Password cannot be blank."]
	},

	// monitor messages by the user
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	}],

	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
})

UserSchema.methods.hashPassword = function(password){
	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.authenticate = function(password){
	return bcrypt.compareSync(password, this.password);
}

UserSchema.pre('save',function(callback){
	this.hashPassword(this.password);
	callback();
});

// Register Model
mongoose.model('User', UserSchema);


