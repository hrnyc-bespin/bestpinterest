import React from 'react';
import ReactDOM from 'react-dom';
import { Route, browserHistory } from 'react-router';
import { Link, BrowserRouter, IndexRoute } from 'react-router-dom';
import Wall from './components/Wall.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Logo from './assets/Logo.jsx';
import Main from './components/Main.jsx';
require('./stylesheets/main.css');

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoggedIn: false,
      user: {},
      posts: []
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  ComponentDidMount() {
    this.getData();
  }

  getData() {
    // axios.get('/posts')
    // .then((data) => {
    //   console.log(data)
    // this.setState({data: data.data})
  }

  handleLogin(username, password) {
    console.log('username: ', username);
    console.log('password: ', password);
  }
  //need to add history
  //in router add history={browserHistory} this will prevent reach to server??
  //default page
  // <IndexRoute component={Login} />
  // <h1>Let us begin</h1>
  // <h3>Bespinterest is BestPinterest</h3>
  // <Login handleLogin={this.handleLogin} />
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="navbar">
            <Logo />
            <p className="navbar_title">Bespinterest</p>
            <ul className="navbar_ul">
              <li>
                <Link to={'/wall'}>Home</Link>
              </li>
              <li>
                <Link to={'/user'}>User</Link>
              </li>
            </ul>
          </nav>
          <Route
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
          <Route path="wall" render={() => <Wall />} />
          <Route path="user" render={() => <Wall />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
