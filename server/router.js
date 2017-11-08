var routes = require('./routes');
var router = require('express').Router();

router.get('/post', function(req, res) {
	db.Post
		.findAll()
		.then(function(data) {
			res.send(200, data);
		})
		.catch(function(err) {
			res.send(null);
		});
});

router.post('/post', function(req, res) {
	db.Post
		.create({
			photourl: req.body.photourl,
			info: reg.body.info
		})
		.then(function() {
			console.log('Post created!');
			res.redirect('/');
		});
});

router.get('/login', function(req, res) {
	db.User
		.find()
		.then(function(data) {
			res.send(200, data);
		})
		.catch(function(err) {
			res.send(null);
		});
});
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

router.get('/board', function(req, res) {
	db.board
		.find()
		.then(function(data) {
			res.send(200, data);
		})
		.catch(function(err) {
			res.send(null);
		});
});
router.post('/makeboard', function(req, res) {
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

module.exports = router;
