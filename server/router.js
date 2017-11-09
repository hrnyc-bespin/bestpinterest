var routes = require('./routes');
var router = require('express').Router();
var db = require('./db/db.js');


//get all public posts to populate the wall
//serves 200 and data or null
router.get('/post', function(req, res) {
	db.Post
		.findAll()
		.then(function(data) {
			res.send(200, data);
		})
		.catch(function(err) {
			res.send(400);
		});
});

// add a new picture/post, receives photourl and info
// serves 200 OK and 400
router.post('/post', function(req, res) {
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
});

//add a picture to board, receives post_id and board_id
//serves 200 OK or 400
router.post('/bespin', function(req, res) {
	db.BoardPost
		.create({
			post_id: req.body.post_id,
			board_id: reg.body.board_id
		})
		.then(function() {
			res.send(200);
			console.log('Post bespinned to board successfully!');
		})
		.catch(function(err) {
			res.send(400);
			console.log('Post NOT bespinned to board!');
		});
});

//upon login receieve username and password,
//serve all public posts,
//serve board ids and board names that belong to user
//serve user id, name
router.get('/login', function(req, res) {
	db.Post
    .findAll()
    .then(function(data) {
      res.send(200, data);
    });
	db.Board
		.find({
      where: { user_id: {req.body.id} }
      attributes: [ 'id', ['name']] }
    )
		.then(function(data) {
			res.send(200, data);
		})
		.catch(function(err) {
			res.send(401);
		});
	db.User
		.find({
      where: { user_id: {req.body.id} }
      attributes: [ 'id', ['name']] }
    )
		.then(function(data) {
			res.send(200, data);
		})
		.catch(function(err) {
			res.send(401);
		});
});

//receive user and password
//serve 201 or 400
router.post('/signup', function(req, res) {
	db.User
		.create({
			username: req.body.username,
			profilepic: req.body.profilepic,
			info: req.body.info
		})
		.then(function() {
			console.log('User created!');
			res.send(201);
		})
		.catch(function(err) {
			console.log('User was NOT created!');
			res.send(400);
		});
});

//boards?={id}, will receive -1 by default
//serve -1 = all
//else serve all posts filtered by board id
router.get('/board', function(req, res) {
	req.body.board_id === -1 ?
  db.Board
    .findAll()
    .then(function(data){
      res.send(200, data);
    })
    .catch(function(err){
      res.send(null);
    }) :
  db.Board
		.find({ where: {id: `${req.body.board_id}`}})
		.then(function(data) {
			res.send(200, data);
		})
		.catch(function(err) {
			res.send(null);
		});
});

//recieve user id  and board name
//201 serve board id and board name
//400 error
router.post('/makeboard', function(req, res) {
	db.Board
		.create({
			name: req.body.name,
			user_id: req.body.user_id
		})
		.then(function() {
			console.log('Board created successfully!');
			res.send(200);
		})
		.catch(function(err) {
			res.send(400);
			console.log('Board NOT created!');
		});
});

module.exports = router;
