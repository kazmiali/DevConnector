const mongoose = require('mongoose');

//This is a usermodel which will be passed to the MongoDB
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

//can be written as module.exports = mongoose.model('User', UserSchema);
module.exports = User = mongoose.model('User', UserSchema);
