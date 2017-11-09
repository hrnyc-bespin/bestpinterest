import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, browserHistory } from 'react-router';
// import { Link, BrowserRouter, IndexRoute, HashRouter } from 'react-router-dom';
// import Popup from 'react-popup';
import Wall from './components/Wall.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Logo from './assets/Logo.jsx';
import Main from './components/Main.jsx';
import Clickphoto from './components/Clickphoto.jsx';

// For testing purposes only
import Users from './testData/usersJs.js';
import Posts from './testData/postsJs.js';

require('./stylesheets/main.css');

const axios = require('axios');
//responsible for getting all the data
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhoto: false,
      isLoggedIn: true,
      user: Users.users[0],
      posts: [],
      boards: []
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleAddBoard = this.handleAddBoard.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handlePin = this.handlePin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSignup(username, password) {
    axios
      .post('/signup', {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log('signup: ', username, password);
  }

  handleLogin(username, password) {
    axios
      .get('/login', {
        params: {
          username: username,
          password: password
        }
      })
      .then(data => {
        this.setState({
          user: data.User,
          boards: data.Board,
          posts: data.Post,
          isLoggedIn: true
        });
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('login ', username);
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false,
      user: {},
      posts: [],
      boards: []
    });
  }

  handleAddBoard(boardName) {
    axios
      .post('/board', { name: boardName, user_id: this.state.user.id })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  // This was moved to Main.jsx
  // handleAddphoto(url, description) {
  //   this.setState({
  //     showPopup: false
  //   });

  //   axios
  //     .post('/post', {
  //       photourl: url,
  //       info: description
  //     })
  //     .then(res => {
  //       console.log(res);
  //       axios
  //         .get('/post')
  //         .then(axios.get('/post'))
  //         .then(data => this.setState({ posts: data }))
  //         .catch(error => console.log(error));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  handlePin(postid, boardid) {
    axios
      .post('/bespin', { postid: postid, boardid: boardid })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClick(photoUrl, photoInfo) {
    this.setState({
      showphoto: !this.state.showphoto,
      clickedPhoto: { photoUrl: photoUrl, photoInfo: photoInfo }
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <Logo />
          <p className="navbar_title">Bespinterest</p>
          <ul className="navbar_ul">
            {this.state.isLoggedIn ?
              <li onClick={this.handleLogout}>Logout</li> : null} 
          </ul>
        </nav>
        {this.state.isLoggedIn ? (
          <Main
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            posts={this.state.posts}
            boards={this.state.boards}
          />
        ) : (
          <Login
            handleLogin={this.handleLogin}
            handleSignup={this.handleSignup}
          />
        )}
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
