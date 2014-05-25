var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

mongoose.connect('mongodb://ss1891:ss1891@novus.modulusmongo.net:27017/Z7imizud');
require('./config/passport')(passport);

/* Configuration */
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser()); 
app.use(cookieParser());
app.use(session({ secret: 'supersecret' })); // Session secret
app.use(passport.initialize());
app.use(passport.session()); // Persistent session
app.use(flash());

/* Register routes */
app.use('/', require('./app/routes/routes'));
app.use('/api', require('./app/routes/users'));
app.use('/api', require('./app/routes/tweets'));

app.listen(port);
console.log('Server listening on port ' + port);