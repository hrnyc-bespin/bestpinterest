const Sequelize = require('sequelize');
const sequelize = new Sequelize('bespin', 'bes', 'passwordmajing', {
  host: 'bes.csm1qfcrhywi.us-east-2.rds.amazonaws.com',
  dialect: 'postgres'
});

sequelize
.authenticate()
.then(() => {
  console.log('connection')
})
.catch(err => console.error('not connected'));


var User = sequelize.define('user', {
   username: Sequelize.STRING,
   profilePic: Sequelize.STRING,
   info: Sequelize.STRING
 });
 
 User.sync({force:false})

var Post = sequelize.define('post', {
  photoUrl: Sequelize.STRING,
  info: Sequelize.STRING
});

Post.belongsTo(User);

Post.sync({force:false})



var Board = sequelize.define('board', {
  
});

Board.sync({force: false});


