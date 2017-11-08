const Sequelize = require('sequelize');
<<<<<<< Updated upstream
const sequelize = new Sequelize('bespin', 'bespin', 'bespinpassword', {
  host: 'bespin.cpeh9sojapsn.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
=======
const sequelize = new Sequelize('bespin', 'bes', 'passwordmajing', {
  host: 'bes.csm1qfcrhywi.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false // DELETE 
>>>>>>> Stashed changes
});

sequelize
.authenticate()
.then(() => {
  console.log('connected')
})
.catch(err => console.error('not connected'));


var User = sequelize.define('users', {
   username: Sequelize.STRING,
   profilepic: Sequelize.STRING,
   info: Sequelize.STRING,
   id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
 });
 
  User.sync({force:false})

var Post = sequelize.define('post', {
  photourl: Sequelize.STRING,
  info: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

  Post.sync({force:false})

var Board = sequelize.define('board', { 
  name: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

  User.hasMany(Board, {as: 'boards'});
  Board.hasMany(Post, {foreignKey: 'id'});

  Board.sync({force: false});


