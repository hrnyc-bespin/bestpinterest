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
import Addphoto from './components/Addphoto.jsx';
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
      clickedPhoto: { photoUrl: '', photoInfo: '' },
      showPopup: false,
      isLoggedIn: true,
      user: {},
      posts: [],
      boards: []
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleAddphoto = this.handleAddphoto.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handlePin = this.handlePin.bind(this);
    this.handleAddBoard = this.handleAddBoard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // ComponentDidMount() {
  //   this.getData();
  // }
  //
  // getData() {
  //   axios.get('/post').then(data => {
  //     this.setState({ posts: data });
  //   });
  // }

  handleLogin(username, password) {
    axios
      .get('/login', {
        params: {
          username: username,
          password: password
        }
      })
      .then(data => {
        axios
          .get('/board', { params: { id: data.id } })
          .then(data => {
            this.setState({ boards: data, isLoggedIn: true });
          })
          .then(axios.get('/post', { params: { id: -1 } }))
          .then(data => this.setState({ posts: data }))
          .catch(err => console.log(err));
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('login ', username);
  }

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

  handleAddBoard(boardName, userId) {
    axios
      .post('/board', { name: boardName, foreignKey: userId })
      .then(res => console.log(res))
      .catch(err => console.log(err));
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

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleAddphoto(url, description) {
    this.setState({
      showPopup: false
    });

    axios
      .post('/post', {
        photourl: url,
        info: description
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .then(
        axios
          .get('/post')
          .then(axios.get('/post', { params: { id: -1 } }))
          .then(data => this.setState({ posts: data }))
          .catch(error => console.log(error))
      );
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
            <li onClick={() => this.togglePopup()}>Add Photo</li>
          </ul>
        </nav>
        {this.state.isLoggedIn ? (
          this.state.showPopup ? (
            <Addphoto handleAddphoto={this.handleAddphoto} />
          ) : null
        ) : (
          <Login
            handleLogin={this.handleLogin}
            handleSignup={this.handleSignup}
          />
        )}
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
