var express = require('express');
var User = require('../models/user');

var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'It works!' });
});

router.route('/users')
	// Create a user
	.post(function(req, res) {
		var user = User({ name: req.body.name });

		user.save(function(err) {
			if (err) res.send(err);
			res.json({ message: 'User ' + user.name + ' created!' });
		});
	})
	// Get all users
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) res.send(err);
			res.json(users);
		});
	});

router.route('/users/:user_id')
	// Get specific user
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);
			res.json(user);
		});
	})
	// Update user
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user){
			if (err) res.send(err);
			user.name = req.body.name;
			user.save(function(err) {
				if (err) res.send(err);
				res.json({ message: 'User details updated!' });
			});
		});
	})
	// Remove user
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err) res.send(err);
			res.json({ message: 'User successfully deleted!' });
		});
	});

	module.exports = router; 