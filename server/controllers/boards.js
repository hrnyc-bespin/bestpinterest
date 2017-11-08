var models = require('../db/db.js');
var express = require('express');
var router = express.Router();

router.post('/boards', function(req, res) {
	db.boards
		.create({
			name: req.body.name,
			user_id: req.body.user_id
		})
		.then(function() {
			console.log('Board created!');
			res.send(true);
			res.redirect('/');
		});
});

//
// router.get('/:user_id/boards/:board_id/destroy', function(req, res) {
// 	db.Board
// 		.destroy({
// 			where: {
// 				id: req.params.board_id
// 			}
// 		})
// 		.then(function() {
// 			res.redirect('/');
// 		});
// });

module.exports = controller;
