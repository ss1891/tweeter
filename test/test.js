var request = require('supertest');
var express = require('express');
var mongoose = require('mongoose');
var mocha = require('mocha');
var should = require('should');
var User = require('../app/models/user');
var Tweet = require('../app/models/tweet');

describe('User', function() {
	var user = new User();
	before(function(done) {
		mongoose.connect('localhost', 'test');
		user.local.email = 'test@test.com';
		user.local.password = user.generateHash('test');
		user.save()
		done();
	});

	after(function(done) {
		mongoose.disconnect(done);
	});

	it('registers a new user', function(done) {
		var newUser = new User();
		newUser.local.email = 'test2@test.com';
		newUser.local.password = newUser.generateHash('test2');
		newUser.local.email.should.equal('test2@test.com');
		newUser.local.password.should.not.equal('test2');
		done();
	});

	it('checks persistent storage of registered users', function(done) {
		user.local.email.should.equal('test@test.com');
		user.local.password.should.not.equal('test');
		done();
	});
});

describe('Tweet', function() {
	var tweet = new Tweet();
	before(function(done) {
		mongoose.connect('localhost', 'test');
		tweet.title = 'test';
		tweet.body = 'test';
		tweet.save()
		done();
	});

	after(function(done) {
		mongoose.disconnect(done);
	});

	it('creates a new tweet', function(done) {
		var newTweet = new Tweet();
		newTweet.title = 'test2';
		newTweet.body = 'test2';
		newTweet.title.should.equal('test2');
		newTweet.body.should.equal('test2')
		done();
	});

	it('checks persistent storage of tweets', function(done) {
		tweet.title.should.equal('test');
		tweet.body.should.equal('test');
		done();
	});
});