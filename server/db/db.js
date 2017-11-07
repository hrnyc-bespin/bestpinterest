var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = mongoose.model('Post', postSchema);
var board = mongoose.model('Board', boardSchema);


var postSchema = new Schema({
  _id: Number,
  photo: String,
  info: String
});

var userSchema = new Schema({
  _id: Number,
  username: String,
  password: String,
  boards: [{type: Schema.ObjectId, ref: 'Board'}]
});

var boardSchema = new Schema({
  _id: Number,
  posts: [{type: Schema.ObjectId, ref: 'Post'}]
})


module.exports = {
  userSchema: userSchema,
  postSchema: postSchema,
  boardSchema: boardSchema
}
