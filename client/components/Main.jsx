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
    console.log('postId', postId); // Passed up from Profile.jsx
    console.log('boardId', boardId);
  }

  handleMakeBoard(boardName) {
    console.log('userId', this.props.user.id);
    console.log('boardName', boardName);
  }

  // Need to handle initial fetch, probably using react lifecycle methods.
  // Will need to do this today.
  handleFetchBoard(boardId) {
    console.log('boardId', boardId); // Board ID
    console.log('exampleQuery', `/boards?=${boardId}`);
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
          handleFetchBoard={this.handleFetchBoard}
          handleMakeBoard={this.handleMakeBoard} /> 
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
