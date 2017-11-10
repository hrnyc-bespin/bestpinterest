var url = require('url');
var db = require('../db/db.js');

module.exports = {
	//add a picture to board, expects postId and boardId
	//serves 200 OK or 400
	bespin: {
		post: function(req, res) {
			db.BoardPost
				.create({
					postId: req.body.postId,
					boardId: req.body.boardId
				})
				.then(function() {
					res.send(200);
					console.log('Post bespinned to board successfully!');
				})
				.catch(function(err) {
					res.send(400);
					console.log('Post NOT bespinned to board!');
				});
		}
	},

	//expects userId
	//serves id and names of boards belonging to that userId
	userboards: {
		get: function(req, res) {
			let reqParams = url.parse(req.url, true).query;
			responseObj = {};
			db.Board
				.findAll({
					attributes: ['id', 'name'],
					where: { userId: reqParams.id }
				})
				.then(function(data) {
					responseObj.boards = data || [];
					res.status(200).send(responseObj);
				})
				.catch(function(err) {
					console.log(err);
				});
		}
	},

	//expects board id, receive -1 by default
	//serves all public posts if -1
	//else serve all posts belonging to that board id
	board: {
		get: function(req, res) {
			let reqParams = url.parse(req.url, true).query;
			reqParams.boardId === '-1'
				? db.Post
						.findAll()
						.then(function(data) {
							res.status(200).send(data);
						})
						.catch(function(err) {
							console.log(err);
							res.sendStatus(400);
						})
				: db.BoardPost
						.findAll({ where: { boardId: req.body.boardId } })
						.then(function(data) {
							res.send(200, data);
						})
						.catch(function(err) {
							res.sendStatus(400);
						});
		}
	}
};
