//require sequelize and connect to the aws server, using postgres
const Sequelize = require('sequelize');
const sequelize = new Sequelize('bespin', 'bespin', 'bespinpassword', {
  host: 'bespin.cpeh9sojapsn.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false, //stops sequelize from outputting sql to the terminal 
});

var isConnected = false; //var can be sent to the front end if the db is not working 

sequelize
.authenticate() //checks the connection to the database 
.then(() => {
  console.log('connected');
  isConnected = true;
})
.catch(err => console.error('not connected'));

var User = sequelize.define('users', { //set up for user table, Post, Board and BoardPost are similar 
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  profilepic: Sequelize.STRING,
  info: Sequelize.STRING
 });
 
var Post = sequelize.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  photourl: Sequelize.STRING,
  info: Sequelize.STRING
});

var Board = sequelize.define('boards', { 
id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
name: Sequelize.STRING
});

var BoardPost = sequelize.define('boardpost', { //this table is for linking boards and posts by id 
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

User.hasMany(Board, {as: 'board'}); //one to many relationship - one user, many boards 

Post.belongsToMany(Board, {through: 'boardpost'}); //these two lines create the many to many for boards and posts 
Board.belongsToMany(Post, {through: 'boardpost'}); //they are linked through the boardpost table by id

/*
When making relational connections between tables, sequelize needs to handle async, 
the sequelize sync function returns a promise, which is why they are all chained

to reform the table(s), change force:true and it will delete the current and recreate it as a blank table,
then change back to false after the file has been run 
*/

User.sync({force:false}) //sync creates the above table in the db
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
exports.isConnected = isConnected;
exports.sequelize = sequelize;