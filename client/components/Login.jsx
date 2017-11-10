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
      password: '',
      profilepic: '',
      info: '',
      showSignUp: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value // Able to pull name straight from element
    });
  }

  onSignUp(e) {
    e.preventDefault();
    this.setState({
      showSignUp: true
    });
  }

  // Dishes out username and password as entered by user
  handleLogin(e) {
    e.preventDefault();
    this.props.handleLogin(this.state.username, this.state.password);
  }

  // If user wishes to signup, rely on main.js 
  // Add info
  handleSignup(e) {
    e.preventDefault();
    this.props.handleSignup(this.state.username, this.state.password, this.state.info, this.state.profilepic);
  }

  render() {
    let signUpForm = (
      <form className="login_form">
          <input type="text" name="username" onChange={this.onChange} placeholder="Username" value={this.state.username} />
          <input type="password" name="password" onChange={this.onChange} placeholder="Password" value={this.state.password} />
          <input type="text" name="profilepic" onChange={this.onChange} placeholder="Enter a profile pic url" value={this.state.profilepic} />
          <input type="text" name="info" onChange={this.onChange} placeholder="Give us a summary about yourself" value={this.state.info} />
          <button className="signup_button" onClick={this.handleSignup}>Request signup!</button>
      </form>
    );

    let loginForm = (
      <form className="login_form">
        <input type="text" name="username" onChange={this.onChange} placeholder="Username" value={this.state.username} />
        <input type="password" name="password" onChange={this.onChange} placeholder="Password" value={this.state.password} />
        <button className="login_button" onClick={this.handleLogin}>
          Login
        </button>
        <button className="login_button" onClick={this.onSignUp}>Sign Up</button>
      </form>
    )

    return (
      <div className="login_main">
        <div className="login_popup">
          <h3 className="login_header">Bespinterest</h3>
          {this.state.showSignUp ? signUpForm : loginForm}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func
};

export default Login;
