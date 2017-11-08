import React from 'react';
import PropTypes from 'prop-types';
import Wall from './Wall.jsx';
require('../stylesheets/profile.css');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.handleBoardClick = this.handleBoardClick.bind(this);
  }

  handleBoardClick(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <div className="user_summary">
          <img src={this.props.profilePic} alt={this.props.username}/>
          <p>{this.props.username}</p>
          <p>{this.props.userInfo}</p>
        </div>
        <div className="user_boards">
          <ul className="user_boards_navbar">
          {this.props.boards.map((board) => 
            <li key={board.id} value={board.name} onClick={this.handleBoardClick}>{board.name}</li>) }
          </ul>
        </div>
        <div className="user_wall">
          {this.state.posts.length > 0 ? <Wall posts={this.state.posts} showInfo={true} handleClick={() => console.log('tbd')} /> :
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