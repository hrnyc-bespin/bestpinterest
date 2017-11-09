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
  photourl: Sequelize.STRING,
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
})

  User.hasMany(Board, {as: 'board'});

  Post.belongsToMany(Board, {through: 'boardpost', foreignKey: 'postid'});
  Board.belongsToMany(Post, {through: 'boardpost', foreignKey: 'boardid'});

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
  })
