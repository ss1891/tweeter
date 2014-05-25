var express = require('express');
var Tweet = require('../models/tweet');
var router = express.Router();

/* 
TODO: Find all tweets with a specific owner
*/

router.route('/tweets')
	// Create a tweet
	.post(function(req, res) {
		var tweet = Tweet({ 
			title: req.body.title,
			body: req.body.body,
			owner: req.body.owner
		});

		tweet.save(function(err){
			if (err) res.send(err);
			res.json({ message: 'Tweet created!' });
		});
	})
	// Get all tweets
	.get(function(req, res) {
		Tweet.find(function(err, tweets){
			if (err) res.send(err);
			res.json(tweets);
		});
	});

router.route('/tweets/:tweet_id')
	// Get specific tweet
	.get(function(req, res){
		Tweet.findById(req.params.tweet_id, function(err, tweet){
			if (err) res.send(err);
			res.json(tweet);
		});
	})
	// Update tweet
	.put(function(req, res){
		Tweet.findById(req.params.tweet_id, function(err, tweet) {
			if (err) res.send(err);
			tweet.title = res.body.title;
			tweet.body = res.body.body;
			tweet.save(function(err){
				if (err) res.send(err);
				res.json({ message: 'Tweet updated!' })
			});
		});
	})
	// Remove tweet
	.delete(function(req, res) {
		Tweet.remove({
			_id: req.params.tweet_id
		}, function(err, tweet) {
			if (err) res.send(err);
			res.json({ message: 'Tweet successfully deleted!' });
		});
	});

	module.exports = router;