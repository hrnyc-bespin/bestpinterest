var mongoose = require('mongoose');

var options = {
  useMongoClient: true,
  reconnectInterval: 2000,
}

mongoose.connect("mongodb://admin:pass@ds249545.mlab.com:49545/bespinterest", options);

var Schema = mongoose.Schema;

var postSchema = new Schema({
  _id: Number,
  photourl: String,
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

var post = mongoose.model('Post', postSchema); 
var board = mongoose.model('Board', boardSchema);