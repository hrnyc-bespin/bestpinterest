import React from 'react';
import PropTypes from 'prop-types';

// Handles form submissions
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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

  render() {
    return (
      <div>
        <h1>Please enter your login</h1>
        <form>
          <input type="text" name="username" onChange={this.onChange} />
          <input type="password" name="password" onChange={this.onChange} />
          <button onClick={this.handleLogin}>Submit</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func
}

export default Login;