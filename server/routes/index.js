var db = require('../db/db.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	db.Posts.findAll().then(function(data) {
		res.send(200, data);
	});
});

router.get('/post', (req, res) => res.sendStatus(200));

module.exports = router;
