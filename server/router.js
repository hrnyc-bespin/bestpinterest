var models = require('./models.js');
var router = require('express').Router();

<<<<<<< HEAD
router.get('/posts', models.posts.get);
router.post('/posts', models.posts.post);

router.get('/users', models.users.get);
router.post('/users', models.users.post);

router.get('/boards', models.boards.get);
router.post('/boards', models.boards.post);
=======
router.get('/posts', controller.posts.get);
router.post('/posts', controller.posts.post);

router.get('/users', controller.users.get);
router.post('/users', controller.users.post);

router.get('/boards', controller.boards.get);
router.post('/boards', controller.boards.post);
>>>>>>> routes

module.exports = router;
