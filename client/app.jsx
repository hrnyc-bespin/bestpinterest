import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import { Link, Router, Route, browserHistory, IndexRoute} from 'react-router';
import Wall from './components/Wall';
import Profile from './components/Profile';
import Login from './components/Login';
const axios = require('axios');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
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
      <nav>
        <ul>
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/"}>Home</Link></li>
        </ul>
      </nav>
      //need to add history
      //in router add history={browserHistory} this will prevent reach to server??
      <Router>
        <IndexRoute component={Login}>//default page
        <Route path="/" component={Wall}/>
        <Route path="/" component={Profile}/>
      </Router>
				<h1>Let us begin</h1>
				<h3>Bespinterest is BestPinterest</h3>
				<Login handleLogin={this.handleLogin} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
