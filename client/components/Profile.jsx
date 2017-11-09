import React from 'react';
import PropTypes from 'prop-types';
import Wall from './Wall.jsx';
import Posts from '../testData/postsJs.js';
import AddBoard from './AddBoard.jsx';
require('../stylesheets/profile.css');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddBoard: false
    };
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.onAddBoard = this.onAddBoard.bind(this);
    this.boardAdded = this.boardAdded.bind(this);
  }

  handleBoardClick(e) {
    this.props.handleFetchBoard(e.target.value);
  }

  onAddBoard(e) {
    this.setState({
      showAddBoard: true
    });
  }

  boardAdded(boardName, cancel = false) {
    if (!cancel) {
      this.props.handleMakeBoard(boardName);
    }
    this.setState({
      showAddBoard: false
    });
  }

  render() {
    return (
      <div>
        <div className="user_summary">
          <img src={this.props.profilePic} alt={this.props.username} />
          <div className="user_details">
            <p className="user_username">{this.props.username}</p>
            <p className="user_info">{this.props.userInfo}</p>
          </div>
        </div>
        <div className="user_boards">
          <ul className="user_boards_navbar">
            <li
              className="link"
              key={-1}
              value={-1}
              onClick={this.handleBoardClick}
            >
              Public Board
            </li>
            {this.props.boards.map(board => (
              <li
                className="link"
                key={board.id}
                value={board.id}
                onClick={this.handleBoardClick}
              >
                {board.name}
              </li>
            ))}
            <li
              className="link"
              key={this.props.boards.length + 1}
              value={this.props.boards.length + 1}
              onClick={this.onAddBoard}
            >
              + Add board
            </li>
          </ul>
        </div>
        {this.state.showAddBoard ? <AddBoard boardAdded={this.boardAdded} /> : null}
        <div className="user_wall">
          <Wall
            boardId={-1}
            posts={Posts.posts}
            showInfo={true}
            handleClick={() => console.log('tbd')}
            handleBespin={this.props.handleBespin}
          />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string,
  profilePic: PropTypes.string,
  userInfo: PropTypes.string,
  boards: PropTypes.array,
  handleBespin: PropTypes.func,
  handleFetchBoard: PropTypes.func,
  handleMakeBoard: PropTypes.func
};

export default Profile;
