var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name field cannot be blank.'],
		maxlength: [120, "Name cannot exceed 120 characters."]
	},
	email: {
		type: String,
		required: [true,"Email field cannot be blank"],
		validate: {
			validator: function(v) {
				return /\S*\@\S*\.\S+/g.test(v);
			},
			message: "You must provide a valid email"
		},
		unique: true
	}
}, { timestamps: true})

mongoose.model('User',UserSchema);