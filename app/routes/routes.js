var express = require('express');
var router = express.Router();
var passport = require('passport');

// Route home page
router.get('/', function(req, res) {
	res.render('index');
});

// Route signup attempts
router.route('/signup')
	.get(function(req, res) {
		res.render('signup', { message: req.flash('signupMessage') });
	})
	.post(passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

// Route login attempts
router.route('/login')
	.get(function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	})
	.post(passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile', { 
			user : req.user
	});
});

router.get('/logout', function(req, res) {
	res.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated) {
		return next();
	}

	res.redirect('/');
}

module.exports = router; 