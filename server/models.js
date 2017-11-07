var db = require('./db/db.js');

exports.posts = {
	get: function(req, res) {
		db.postSchema.find({}).then(data => res.send(data));
	},

	post: function(req, res) {
		db.postSchema.create(
			{
				_id: req.body.id,
				photourl: req.body.photourl,
				info: req.body.info
			},
			function(err, result) {
				if (err) {
					console.error(err);
					return;
				}
				res.send(`Photo added!`);
			}
		);
	}
};

exports.users = {
	get: function(req, res) {
		db.userSchema.find({}).then(data => res.send(data));
	},

	post: function(req, res) {
		db.userSchema.create(
			{
				_id: req.body.id,
				name: req.body.name,
				password: req.body.password,
				boards: req.body.boards
			},
			function(err, result) {
				if (err) {
					console.error(err);
					return;
				}
				res.send(`User created!`);
			}
		);
	}
};

exports.boards = {
	get: function(req, res) {
		db.boardSchema.find({}).then(data => res.send(data));
	},

	post: function(req, res) {
		db.boardSchema.create(
			{
				_id: req.body.id,
				posts: req.body.posts
			},
			function(err, result) {
				if (err) {
					console.error(err);
					return;
				}
				res.send(`Board created!`);
			}
		);
	}
};
