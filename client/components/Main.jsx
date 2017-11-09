import React from 'react';
import PropTypes from 'prop-types';
import Wall from './Wall.jsx';
import Profile from './Profile.jsx';

// For testing purposes only
import Users from '../testData/usersJs.js';
import Posts from '../testData/postsJs.js';

/**
 * TODO: Document this
 */

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        {/* <Wall posts={Posts.posts} showInfo={true} handleClick={() => {}} /> */}
        <Profile username={Users.users[0].username} profilePic={Users.users[0].profilePic} userInfo={Users.users[0].info} boards={[{id:0, name:'hey'},{id:1,name:'yusaku'}]} /> 
      </div>
    );
  }
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object, // User should have an array of board ids as part of its schema
  posts: PropTypes.array
};

export default Main;
