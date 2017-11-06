var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  id: Number,
  photo: String,
  info: String
});

var userSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  boards: [boardSchema]
});

var boardSchema = new Schema({
  id: Number,
  posts: [postSchema]
})