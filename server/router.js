// var routes = require('./routes');
var router = require('express').Router();
var url = require('url');
var db = require('./db/db.js');

//OK
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

//OK
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

//OK
//add a picture to board, receives postId and boardId
//serves 200 OK or 400
router.post('/bespin', function(req, res) {
  db.BoardPost
    .create({
      postId: req.body.postId,
      boardId: reg.body.boardId
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

//OK
//upon login receieve username and password,
//serve board ids and board names that belong to user
//serve user id, name
router.get('/login', function(req, res) {
  var responseObj = {};
  let reqParams = url.parse(req.url, true).query;
  //findOne returns one object
  //findAll returns an array of objects
  db.User
    .findOne({
      where: { username: reqParams.username }
    })
    .then(function(data) {
      // This is now the found user
      responseObj.user = data;

      return db.Board.findAll({
        where: { id: data.id }
      });
    })
    .then(function(data) {
      // Check for boards, pass back empty array if null
      responseObj.boards = data || [];
      res.send(200, responseObj);
    })
    .catch(function(err) {
      console.log('Incorrect username or password');
      console.log(err);
      res.sendStatus(401);
    });
});

//OK
//receive user and password
//serve 201 or 400
router.post('/signup', function(req, res) {
	db.User
		.create({
			username: req.body.username,
			password: req.body.password,
			profilepic: req.body.profilepic,
			info: req.body.info
		})
		.then(function(user) {
      console.log('User created!');
			res.status(201).send(user);
		})
		.catch(function(err) {
			console.log('User was NOT created!');
			res.send(400);
		});
});

//OK
//boards?={id}, will receive -1 by default
//serve -1 = all
//else serve all posts filtered by board id
router.get('/board', function(req, res) {
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
		: db.Board
				.findOne({ where: { id: req.body.boardId } })
				.then(function(data) {
					res.send(200, data);
				})
				.catch(function(err) {
					res.sendStatus(400);
				});
});

//OK
//recieve user id  and board name
//201 serve board id and board name
//400 error
router.post('/makeboard', function(req, res) {
  db.Board
    .create({
      name: req.body.name,
      userId: req.body.userId
    })
    .findOne({ where: { userId: req.body.userId } })
    .then(function(data) {
      console.log('Board created successfully!');
      res.send(201, data);
    })
    .catch(function(err) {
      console.log('Board NOT created!');
      res.send(400);
    });
});

module.exports = router;
