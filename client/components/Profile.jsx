import React from 'react';
import PropTypes from 'prop-types';
import Wall from './Wall.jsx';
import Posts from '../testData/postsJs.js';
require('../stylesheets/profile.css');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [1]
    };
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.handleAddBoard = this.handleAddBoard.bind(this);
  }

  /**
   * This uses the <li> element's value for requests to the server
   * @param {*} e - emitted event, containing the desired board value
   */
  handleBoardClick(e) {
    console.log(e.target.value);
  }

  handleAddBoard(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <div className="user_summary">
          <img src={this.props.profilePic} alt={this.props.username}/>
          <div className="user_details">
            <p className="user_username">{this.props.username}</p>
            <p className="user_info">{this.props.userInfo}</p>
          </div>
        </div>
        <div className="user_boards">
          <ul className="user_boards_navbar">
            <li className="link" key={-1} value={-1} onClick={this.handleBoardClick}>Public Board</li>
            {this.props.boards.map((board) => 
              <li className="link" key={board.id} value={board.id} onClick={this.handleBoardClick}>{board.name}</li>) }
            <li className="link" key={this.props.boards.length + 1} value={this.props.boards.length + 1} onClick={this.handleAddBoard}>+ Add a board</li>
          </ul>
        </div>
        <div className="user_wall">
          {this.state.posts.length > 0 ? <Wall posts={Posts.posts} showInfo={true} handleClick={() => console.log('tbd')} /> :
            <div className="user_empty_wall">
              <p>Add a board!</p>
            </div>}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string,
  profilePic: PropTypes.string,
  userInfo: PropTypes.string,
  boards: PropTypes.array
};

export default Profile;