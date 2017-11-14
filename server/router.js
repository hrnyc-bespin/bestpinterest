var controller = require('./controllers');
var router = require('express').Router();
var url = require('url');
var db = require('./db/db.js');

// Connect controller methods to their corresponding routes

// BoardPost
router.post('/bespin', controller.boards.bespin.post);

// Making/getting boards
router.get('/userboards', controller.boards.userboards.get);
router.get('/board', controller.boards.board.get);
router.post('/makeboard', controller.boards.makeboard.post);

// Handling user login/logout
router.post('/login', controller.users.login.post);
// This is for sessions, not yet implemented
router.get('/logout', controller.users.logout.get);
router.post('/signup', controller.users.signup.post);

// Handles inserting a post
router.post('/post', controller.posts.post.post);

module.exports = router;
