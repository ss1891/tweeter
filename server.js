var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser()); 

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'hooray! our API works!' });
});

// Add more routes here

// Register routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server listening on port ' + port);