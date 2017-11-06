import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx'
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  ComponentDidMount() {
    this.getData();
  }

  getData() {
    // axios.get(url);
  }

  handleLogin(username, password) {
    console.log('username: ', username);
    console.log('password: ', password);
  }

  render() {
    return (
      <div>
        <h1>Let us begin</h1>
        <h3>Bespinterest is BestPinterest</h3>
        <Login handleLogin={this.handleLogin}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
