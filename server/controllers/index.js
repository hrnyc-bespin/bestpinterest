var db = require('../db/db.js');
var express = require('express');
var router = express.Router();

//when get request sent to /, return all posts
router.get('/', function(req, res) {
	db.Posts.findAll().then(function(data) {
		res.send(200, data);
	});
});

module.exports = controller;
