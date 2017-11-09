import React from 'react';
import PropTypes from 'prop-types';
import Wall from './Wall.jsx';
import Profile from './Profile.jsx';
import Addphoto from './Addphoto.jsx';

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
    this.state = {
      showAddPhoto: false
    };
    this.handleBespin = this.handleBespin.bind(this);
    this.handleMakeBoard = this.handleMakeBoard.bind(this);
    this.handleFetchBoard = this.handleFetchBoard.bind(this);
    this.handleAddPhoto = this.handleAddPhoto.bind(this);
    this.onAddPhoto = this.onAddPhoto.bind(this);
  }

  // User pressed on heart over a photo
  handleBespin(postId, boardId) {
    console.log('postId', postId); // Passed up from Profile.jsx
    console.log('boardId', boardId);
  }

  // User pressed Add Board
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

  // If cancel is true, user pressed cancel button
  handleAddPhoto(photoUrl, photoInfo, cancel = false) {
    if (!cancel) {
      console.log('photoUrl', photoUrl);
      console.log('photoInfo', photoInfo);
    }
    this.setState({
      showAddPhoto: false
    });
  }

  // User clicked the add photo button
  onAddPhoto() {
    this.setState({
      showAddPhoto: true
    });
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
        
        {this.state.showAddPhoto ? 
          <Addphoto handleAddPhoto={this.handleAddPhoto} /> : null }
        <button className="add_photo_button" onClick={this.onAddPhoto}>+</button>
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
