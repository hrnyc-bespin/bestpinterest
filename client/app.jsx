import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< Updated upstream
=======
import Login from './components/Login.jsx'
const axios = require('axios');
>>>>>>> Stashed changes

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
ReactDOM.render(<App />, document.getElementById('app'));
=======
ReactDOM.render(<App />, document.getElementById('app'));
>>>>>>> Stashed changes
