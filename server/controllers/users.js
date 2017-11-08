var db = require('../db/db.js');
var express = require('express');
var router = express.Router();

router.post('/signup', function(req, res) {
	db.User
		.create({
			username: req.body.username,
			profilepic: req.body.profilepic,
			info: req.body.info
		})
		.then(function() {
			console.log('User created!');
			res.redirect('/');
		});
});

// router.get('/:user_id/destroy', function(req, res) {
// 	db.User
// 		.destroy({
// 			where: {
// 				id: req.params.user_id
// 			}
// 		})
// 		.then(function() {
// 			res.redirect('/');
// 		});
// });

module.exports = router;
