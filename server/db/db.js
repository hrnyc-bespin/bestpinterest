const sequelize = require('sequelize');
const connection = new sequelize('bespinterest', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

var Post = sequelize.define('post', {
  id: Sequelize.INTEGER,
  photoUrl: Sequelize.STRING,
  info: Sequelize.STRING
});

var User = sequelize.define('user', {
  id: Sequelize.INTEGER,
  username: Sequelize.STRING,
  profilePic: Sequelize.STRING,
  info: Sequelize.STRING
});

var Board = sequelize.define('board', {
  id: Sequelize.INTEGER,
  
});