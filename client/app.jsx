import React from 'react';
import ReactDOM from 'react-dom';
import { Route, browserHistory } from 'react-router';
import { Link, BrowserRouter, IndexRoute, HashRouter } from 'react-router-dom';
import Popup from 'react-popup';
import Wall from './components/Wall.jsx';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      isLoggedIn: false,
      user: {},
      posts: []
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleAddphoto = this.handleAddphoto.bind(this);
  }

  ComponentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ user: Users, posts: Posts });
    // console.log(this.state);
    // axios.get('/posts')
    // .then((data) => {
    //   console.log(data)
    // this.setState({data: data})
  }

  handleLogin(username, password) {
    console.log('username: ', username);
    console.log('password: ', password);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleAddphoto(url, description) {
    console.log('photo', description);
    this.setState({
      showPopup: false
    });
  }

  handleClick() {}

  render() {
    return (
      <HashRouter>
        <div>
          <nav className="navbar">
            <Logo />
            <p className="navbar_title">Bespinterest</p>
            <ul className="navbar_ul">
              <li>
                <Link className="link" to={'/wall'}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="link" to={'/profile'}>
                  User
                </Link>
              </li>
              <li onClick={() => this.togglePopup()}>Add Photo</li>
            </ul>
          </nav>
          {this.state.isLoggedIn ? (
            this.state.showPopup ? (
              <Addphoto handleAddphoto={this.handleAddphoto} />
            ) : null
          ) : (
            <Login handleLogin={this.handleLogin} />
          )}
          <Route
            exact
            path="/"
            render={() =>
              this.state.isLoggedIn ? (
                <Main
                  isLoggedIn={this.state.isLoggedIn}
                  user={this.state.user}
                  posts={this.state.posts}
                />
              ) : (
                <Login handleLogin={this.handleLogin} />
              )}
          />
          <Route
            path="/wall"
            render={() => (
              <Main posts={this.state.posts} handleClick={this.handleClick} />
            )}
          />
          <Route path="/profile" render={() => <Profile />} />
        </div>
      </HashRouter>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
