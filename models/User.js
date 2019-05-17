const mongoose = require('mongoose');

//This is a Schema which will be passed to the MongoDB
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

// can be written as Models are fancy constructors
// compiled from Schema definitions. An instance
// of a model is called a document. Models are
// responsible for creating and reading documents from the
// underlying MongoDB database.

//Here a model from the UserSchema will be created
module.exports = mongoose.model('users', UserSchema);
