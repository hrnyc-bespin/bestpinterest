import React from 'react';
import ReactDOM from 'react-dom';
import { Route, browserHistory } from 'react-router';
import { Link, BrowserRouter, IndexRoute } from 'react-router-dom';
// import Login from './components/Login.jsx';
import Wall from './components/Wall.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
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
	//need to add history
	//in router add history={browserHistory} this will prevent reach to server??
	//default page
	// <IndexRoute component={Login} />
	render() {
		return (
			<BrowserRouter>
				<div>
					<nav>
						<ul>
							<li>
								<Link to={'/wall'}>Home</Link>
							</li>
							<li>
								<Link to={'/user'}>user</Link>
							</li>
						</ul>
					</nav>
					<Route path="wall" component={Wall} />
					<Route path="user" component={Profile} />
					<h1>Let us begin</h1>
					<h3>Bespinterest is BestPinterest</h3>
					<Login handleLogin={this.handleLogin} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
