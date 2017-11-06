var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = mongoose.model('Post', postSchema);
var board = mongoose.model('Board', boardSchema);


var postSchema = new Schema({
  id: Number,
  photo: String,
  info: String
});

var userSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  boards: [{type: boardSchema, ref: 'Board'}]
});

var boardSchema = new Schema({
  id: Number,
  posts: [{type: postSchema, ref: 'Post'}]
})

