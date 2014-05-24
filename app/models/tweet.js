var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
	title: String,
	body: String,
	owner: mongoose.Schema.ObjectId
});

module.exports = mongoose.model('Tweet', TweetSchema);