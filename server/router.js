var models = require('./models.js');
var router = require('express').Router();

router.get('/posts', controller.posts.get);
router.post('/posts', controller.posts.post);

router.get('/users', controller.users.get);
router.post('/users', controller.users.post);

router.get('/boards', controller.boards.get);
router.post('/boards', controller.boards.post);

module.exports = router;
