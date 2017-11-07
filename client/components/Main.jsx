import React from 'react';
import PropTypes from 'prop-types';
import Wall from './Wall.jsx';
import Profile from './Profile.jsx';

/**
 * TODO: Document this
 */

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="">
        <h1>Primary app screen to host all other components aside from login</h1>
        <h1>This should receive most of it's data from above, may be able to shift this to a functional stateless</h1>
        <Wall posts={[]} showInfo={true} handleClick={() => {}} />
      </div>
    );
  }
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object, // User should have an array of board ids as part of its schema
  posts: PropTypes.array
} 

export default Main;