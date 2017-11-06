var db = require('./db.js');

exports.profiles = {
	get: function(req, res) {
		db.CHANGE_THIS.find({}).then(data => res.send(data));
	},

	post: function(req, res) {
		console.log(req.body);
		db.CHANGE_THIS.create(
			{
				name: req.body.name,
				description: req.body.description,
				photourl: req.body.photourl
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
