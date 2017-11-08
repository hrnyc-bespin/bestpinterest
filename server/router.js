var controllers = require('./controllers');
var router = require('express').Router();

router.get('/posts', controllers.posts.get);
router.post('/posts', controllers.posts.post);

router.get('/users', controllers.users.get);
router.post('/users', controllers.users.post);

router.get('/boards', controllers.boards.get);
router.post('/boards', controllers.boards.post);

module.exports = router;
