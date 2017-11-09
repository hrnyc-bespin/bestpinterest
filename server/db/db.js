const Sequelize = require('sequelize');
const sequelize = new Sequelize('bespin', 'bespin', 'bespinpassword', {
  host: 'bespin.cpeh9sojapsn.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
});

sequelize
.authenticate()
.then(() => {
  console.log('connected')
})
.catch(err => console.error('not connected'));

var User = sequelize.define('users', {
   username: Sequelize.STRING,
   password: Sequelize.STRING,
   profilepic: Sequelize.STRING,
   info: Sequelize.STRING,
   id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
 });
 
var Post = sequelize.define('posts', {
  photoUrl: Sequelize.STRING,
  info: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

var Board = sequelize.define('boards', { 
  name: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

var BoardPost = sequelize.define('boardpost', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

User.hasMany(Board, {as: 'board'});

Post.belongsToMany(Board, {through: 'boardpost'});
Board.belongsToMany(Post, {through: 'boardpost'});

User.sync({force:false})
  .then(() => {
    return Post.sync({force:false}).then((data) => {
      console.log('PostThen');
    })
  })
  .then(() => {
    return Board.sync({force: false}).then((data) => { 
      console.log('BoardThen')
    })
  })
  .catch((e) => {
    console.log('catchingPost', e);
  }) 
  .then(() => {
    return BoardPost.sync({force:false}).then((data) => {
      console.log('BoardPostThen')
    })
  })
  .catch((e) => {
    console.log('BoardPostCatch', e)
  });

exports.User = User;
exports.Post = Post;
exports.Board = Board;
exports.BoardPost = BoardPost;

// testing database 
// User.create({
//   username: 'user1',
//   password: 'password1',
//   profilepic: 'https://media.wired.com/photos/5926c3878d4ebc5ab806b67f/master/pass/SpockHP-464967684.jpg',
//   info: 'I am Spock'
// });

// Post.create({
//   photourl: 'http://www.startrek.com/uploads/assets/articles/9a5570aa205c967c350c52e4ad43bc8ab6fdecd0.png',
//   info: 'star trek logo'
// });

// Board.create({
//   name: 'Star Trek',
//   userId: 3 //should pass req.body.id
// });

// BoardPost.create({
//   postId: null,  //should pass req.body.postid
//   userId: null //should pass req.body.id
// });