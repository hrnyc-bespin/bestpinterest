import React from 'react';
import PropTypes from 'prop-types';

/**
 * Responsible for managing the login and signup requests from the user
 * Validation is handled by parent component, since this is a default screen
 * i.e. it will only show if the user is not logged in, which the parent
 * component is responsible for managing. 
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
    this.offSignUp = this.offSignUp.bind(this);
  }

  /**
   * Required for creating controlled components
   * @param {*} e 
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value // Able to pull name straight from element
    });
  }

  /**
   * Component handlers for rendering the extended sign-up div as opposed to the
   * more punctate login div 
   * @param {*} e 
   */
  onSignUp(e) {
    e.preventDefault();
    this.setState({
      showSignUp: true
    });
  }

  offSignUp(e) {
    e.preventDefault();
    this.setState({
      showSignUp: false
    });
  }

  /**
   * Informs parent that this is ready for managing. As this is a default screen,
   * the parent component will be responsible for determining data validity. 
   * 
   * @param {*} e 
   */
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
          <div className="button_holder">
            <button className="login_button" onClick={this.handleSignup}>Submit</button>
            <button className="login_button" onClick={this.offSignUp}>Cancel</button>
          </div>
      </form>
    );

    let loginForm = (
      <form className="login_form">
        <input type="text" name="username" onChange={this.onChange} placeholder="Username" value={this.state.username} />
        <input type="password" name="password" onChange={this.onChange} placeholder="Password" value={this.state.password} />
        <div className="button_holder">
          <button className="login_button" onClick={this.handleLogin}>Login</button>
          <button className="login_button" onClick={this.onSignUp}>Sign Up</button>
        </div>
      </form>
    );

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
