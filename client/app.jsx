import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Logo from './assets/Logo.jsx';
import Main from './components/Main.jsx';
import Helper from './helpers/helpers.js';
require('./stylesheets/main.css');

var axios = require('axios');

/**
 * Responsible for managing user access into and out of the application
 */
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

  /**
   * Handles server requests for signing up, logging the user in if sign-up
   * is valid
   * @param {*} username 
   * @param {*} password 
   * @param {*} info 
   * @param {*} profilepic 
   */
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

  /**
   * Receives username and password from login component.
   * If some simple validation passes, query is made to back end.
   * @param {*} username 
   * @param {*} password 
   */
  handleLogin(username, password) {
    if (this.helper.validateLogin(username, password)) {
      axios.post('login', {
          username: username,
          password: password
      })
        .then((res) => {
          this.setState({
            user: res.data.user,
            isLoggedIn: true
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert('Invalid password');
          } else if (err.response.status === 404) {
            alert('Invalid username');
          } else {
            alert('Trouble validating');
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
    axios
      .get('/logout')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert('error with server');
      })
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <Logo />
          <p className="navbar_title">Bespinterest</p>
          <ul className="navbar_ul">
            {this.state.isLoggedIn ? (
              <li className="link"onClick={this.handleLogout}>Logout</li>
            ) : null}
          </ul>
        </nav>
        {this.state.isLoggedIn ? (
          <Main
            helper={this.helper}
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
