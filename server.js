// Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var User = require('./app/models/user');

app.use(bodyParser()); 

var port = process.env.PORT || 3000;

/* API ROUTES
========== */
var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next(); // Go to next route, don't stop here
});

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
			res.json({ message: 'User successfully deleted.' });
		});
	});

// Register routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server listening on port ' + port);