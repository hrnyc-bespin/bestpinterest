import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Logo from './assets/Logo.jsx';
import Main from './components/Main.jsx';
import Addphoto from './components/Addphoto.jsx';

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
      // showPhoto: false,
      isLoggedIn: true,
      user: Users.users[0]
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
      user: {}
    });
  }

  handleAddBoard(boardName) {
    axios
      .post('/board', { name: boardName, user_id: this.state.user.id })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('userId', this.state.user.id);
    console.log('boardName', boardName);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <Logo />
          <p className="navbar_title">Bespinterest</p>
          <ul className="navbar_ul">
            {this.state.isLoggedIn ? (
              <li onClick={this.handleLogout}>Logout</li>
            ) : null}
          </ul>
        </nav>
        {this.state.isLoggedIn ? (
          <Main
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            handleAddBoard={this.handleAddBoard}
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
