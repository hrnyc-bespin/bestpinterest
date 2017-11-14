// Require sequelize and connect to the aws server, using postgres
const Sequelize = require('sequelize');
const sequelize = new Sequelize('bespin', 'bespin', 'bespinpassword', {
  host: 'bespin.cpeh9sojapsn.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  // Stops sequelize from outputting sql to the terminal
  logging: false, 
});

// Helper variable to check if the db is connected to alert the front end that
// the server is running but a connection could not be established to the DB.
// This is not yet implemented. 
var isConnected = false;  

sequelize
.authenticate() // Confirms connection to the database
.then(() => {
  console.log('connected');
  isConnected = true;
})
.catch(err => console.error('not connected'));

// User table schema
var User = sequelize.define('users', {
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

// Post table schema
var Post = sequelize.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  photourl: Sequelize.STRING,
  info: Sequelize.STRING
});

// Board table schema
var Board = sequelize.define('boards', { 
id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
name: Sequelize.STRING
});

// Join table for boards and posts
var BoardPost = sequelize.define('boardpost', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

// One to many relationship - One user has many boards
User.hasMany(Board, {as: 'board'});

// These two lines create the many to many for boards and posts
Post.belongsToMany(Board, {through: 'boardpost'});

// They are linked through the boardpost table by id
Board.belongsToMany(Post, {through: 'boardpost'});

/*
When making relational connections between tables, Sequelize needs to handle async, 
the Sequelize ync function returns a promise, which is why they are all chained

To reform the table(s), change force:true and it will delete the current tables,
recreating them as as fresh, blank tables,

Remember to change back to false after the file has been run 
*/

// Sync creates the above table in the db
User.sync({force:false}) 
  .then(() => {
    return Post.sync({force:false}).then((data) => {
      console.log('Post Then');
    });
  })
  .catch((e) => {
    console.log('Catching Post')
  })
  .then(() => {
    return Board.sync({force: false}).then((data) => { 
      console.log('Board Then')
    });
  })
  .catch((e) => {
    console.log('Catching Board', e);
  }) 
  .then(() => {
    return BoardPost.sync({force:false}).then((data) => {
      console.log('BoardPost Then')
    });
  })
  .catch((e) => {
    console.log('Catching BoardPost', e)
  });

exports.User = User;
exports.Post = Post;
exports.Board = Board;
exports.BoardPost = BoardPost;
exports.isConnected = isConnected;
exports.sequelize = sequelize;