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
  }

  onChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.handleLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <h1>Please enter your login</h1>
        <form>
          <input type="text">Username</input>
          <input type="password" name="password">Password</input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func
} 