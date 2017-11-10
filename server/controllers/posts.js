var url = require('url');
var db = require('../db/db.js');

module.exports = {
	post: {
		//get all public posts to populate the wall
		//serves 200 and data or null
		get: function(req, res) {
			db.Post
				.findAll()
				.then(function(data) {
					res.send(200, data);
				})
				.catch(function(err) {
					res.send(400);
				});
		},

		// add a new picture/post, receives photourl and info
		// serves 200 OK and 400
		post: function(req, res) {
			db.Post
				.create({
					photourl: req.body.photourl,
					info: req.body.info
				})
				.then(function() {
					res.send(200);
					console.log('Post created successfully!');
				})
				.catch(function(err) {
					res.send(400);
					console.log('Post NOT created!');
				});
		}
	}
};
