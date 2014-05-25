var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	local: {
		email: String,
		password: String,
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String,
	},
	twitter: {
		id: String,
		token: String,
		displayName: String,
		userName: String
	}
});

// Generate a hash
UserSchema.methods.generateHash = function(password, next) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null, next);
}

// Check if password is valid
UserSchema.methods.validPassword = function(password, next) {
	return bcrypt.compareSync(password, this.local.password, next);
}

module.exports = mongoose.model('User', UserSchema);