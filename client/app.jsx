import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Logo from './assets/Logo.jsx';
import Main from './components/Main.jsx';
import Helper from './helpers/helpers.js';
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
    this.helper = new Helper();
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSignup(username, password, info, profilepic) {
    if (this.helper.validateSignup(username, password, info, profilepic)) {
      axios
        .post('/signup', {
          username: username,
          password: password,
          profilepic: profilepic,
          info: info
        })
        .then((res) => {
          this.setState({
            isLoggedIn: true,
            user: res.data
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Check your entry fields, please!');
    }
  }

  handleLogin(username, password) {
    if (this.helper.validateLogin(username, password)) {
      axios.get('login', {
        params: {
          username: username,
          password: password
        }
      })
        .then((res) => {
          this.setState({
            user: res.data.user,
            isLoggedIn: true
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert('Invalid login credentials');
          } 
          console.log(err)
        });
    } else {
      alert('Check your entry fields please!');
    }
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
