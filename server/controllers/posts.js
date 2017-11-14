var url = require('url');
var db = require('../db/db.js');

module.exports = {
	post: {
		// add a new picture/post, receives photourl and info
		// serves 200 OK and 400
		post: function(req, res) {
			db.Post
      .create({
        photourl: req.body.photourl,
        info: req.body.info
      })
      .then(function() {
        console.log('Post created successfully!');
        res.sendStatus(200);          
      })
      .catch(function(err) {
        console.log(err);
        console.log('Post NOT created!');
        res.sendStatus(400);          
      });
		}
	}
};
