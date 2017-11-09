import React from 'react';
import PropTypes from 'prop-types';
require('../stylesheets/main.css');

/**
 * Houses two controlled components managed in its state. 
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value // Able to pull name straight from element
    });
  }

  // Dishes out username and password as entered by user
  handleLogin(e) {
    e.preventDefault();
    this.props.handleLogin(this.state.username, this.state.password);
  }

  // If user wishes to signup, rely on main.js 
  handleSignup(e) {
    e.preventDefault();
    this.props.handleSignup(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="login_main">
        <div className="login_popup">
          <h3 className="login_header">Bespinterest</h3>
          <form className="login_form">
            <input type="text" name="username" onChange={this.onChange} placeholder="Username" />
            <input type="password" name="password" onChange={this.onChange} placeholder="Password" />
            <button className="login_button" onClick={this.handleLogin}>
              Login
            </button>
            <button className="login_signup" onClick={this.handleSignup}>
              Sign up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func
};

export default Login;
