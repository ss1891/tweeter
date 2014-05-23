// Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var User = require('./app/models/user');

app.use(bodyParser()); 

var port = process.env.PORT || 3000;

// Routes
var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next(); // Go to next route, don't stop here
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! our API works!' });
});

// Register routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server listening on port ' + port);