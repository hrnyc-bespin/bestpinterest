var models = require('./models.js');
var router = require('express').Router();

router.get('/CHANGE_THIS', models.CHANGE_THIS.get);
router.post('/CHANGE_THIS', models.CHANGE_THIS.post);

module.exports = router;
