/* Handles authentication */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {

	/* Passport session setup */
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	/* Local signup */
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			// If user already exists
			User.findOne({ 'local.email': email }, function(err, user) {
				if (err) return done(err);
				if (user) {
					return done(null, false, req.flash('signupMessage', 'The email is already registered.'));
				} else {
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					// Save the new user
					newUser.save(function(err) {
						if (err) res.send(err);
						return done(null, newUser);
					});
				}
			});
		});
	}));

	/* Local login */
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true 
	}, 
	function(req, email, password, done) {
		User.findOne({ 'local.email': email }, function(err, user) {
			if (err) return done(err);
			if (!user) return done(null, false, req.flash('loginMessage', 'No user registered with this email.'));
			if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Invalid password.'));
			// Else login
			return done(null, user)
		});
	}));
}