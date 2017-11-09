import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Logo from './assets/Logo.jsx';
import Main from './components/Main.jsx';
require('./stylesheets/main.css');

// For testing purposes only
import Users from './testData/usersJs.js';
import Posts from './testData/postsJs.js';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null
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

  handleLogin(username1, password1) {
    console.log(`user: ${username1} pw: ${password1}`);
    axios.get('login', {
      params: {
        username: username1,
        password: password1
      }
    })
      .then(({data}) => {
        this.setState({
          user: data.user,
          isLoggedIn: true
        });
      })
      .catch(err => console.log(err));
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false,
      user: null
    });
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
