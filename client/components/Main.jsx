import React from 'react';
import PropTypes from 'prop-types';
import Wall from './Wall.jsx';
import Profile from './Profile.jsx';

// For testing purposes only
import Users from '../testData/usersJs.js';
import Posts from '../testData/postsJs.js';

/**
 * Acts as the intermediary component between the lower components
 * Handle all server interactions
 * 
 * Need to hook into lifecycle methods to handle making new boards
 */
//responsible for rendering all the page
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleBespin = this.handleBespin.bind(this);
    this.handleMakeBoard = this.handleMakeBoard.bind(this);
    this.handleFetchBoard = this.handleFetchBoard.bind(this);
  }

  handleBespin(postId, boardId) {
    console.log(postId, boardId); // Passed up from Profile.jsx
  }

  handleMakeBoard(boardName) {
    console.log(this.props.user.id);
    console.log(boardName);
  }

  handleFetchBoard(e) {
    console.log(e.target.value); // Board ID
  }

  render() {
    return (
      <div className="main">
        <Profile 
          username={Users.users[0].username} 
          profilePic={Users.users[0].profilePic} 
          userInfo={Users.users[0].info} 
          boards={[{id:0, name:'hey'},{id:1,name:'yusaku'}]}
          handleBespin={this.handleBespin}
          handleFetchBoard={this.handleFetchBoard} /> 
      </div>
    );
  }
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object, 
  posts: PropTypes.array,
  boards: PropTypes.array,
};

export default Main;
