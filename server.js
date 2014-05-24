var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser()); 

var port = process.env.PORT || 3000;

// Register routes (controllers)
app.use('/api', require('./app/routes/users'));
app.use('/api', require('./app/routes/tweets'));

app.listen(port);
console.log('Server listening on port ' + port);