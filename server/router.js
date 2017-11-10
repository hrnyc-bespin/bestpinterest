var controller = require('./controllers');
var router = require('express').Router();
var url = require('url');
var db = require('./db/db.js');

//Connect controller methods to their corresponding routes

router.post('/bespin', controller.boards.bespin.post);
router.get('/userboards', controller.boards.userboards.get);
router.get('/board', controller.boards.board.get);
router.post('/makeboard', controller.boards.makeboard.post);

router.get('/login', controller.users.login.get);
router.post('/signup', controller.users.signup.post);

router.post('/post', controller.posts.post.post);

module.exports = router;
