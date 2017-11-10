import React from 'react';
import PropTypes from 'prop-types';
import Wall from './Wall.jsx';
import Posts from '../testData/postsJs.js';
import AddBoard from './AddBoard.jsx';

/**
 * Responsible for the actual rendering of user data and the selected wall
 * of desired posts
 */
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

  /**
   * Click handler for the list of boards, passes back the selected board to
   * Main
   * @param {*} e 
   */
  handleBoardClick(e) {
    this.props.handleFetchBoard(e.target.value);
  }

  /**
   * Display the AddBoard component
   * @param {*} e 
   */
  onAddBoard(e) {
    this.setState({
      showAddBoard: true
    });
  }

  /**
   * The callback for the AddBoard component.
   * @param {*} boardName 
   * @param {*} cancel - optional parameter 
   */
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
          <img
            src={this.props.profilePic}
            alt={`error loading photo for ${this.props.username}`}
          />
          <div className="user_details">
            <p className="user_username">{this.props.username}</p>
            <p className="user_info">{this.props.userInfo}</p>
          </div>
        </div>
        <div className="user_boards">
          <ul className="user_boards_navbar">
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
            <li className="link" onClick={this.onAddBoard}>
              + Add board
            </li>
          </ul>
        </div>
        {this.state.showAddBoard ? (
          <AddBoard boardAdded={this.boardAdded} />
        ) : null}
        <div className="user_wall">
          <Wall
            boardId={this.props.currentBoard}
            posts={this.props.posts}
            showInfo={true}
            handleClick={() => console.log('tbd')}
            onBespin={this.props.onBespin}
          />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
  profilePic: PropTypes.string,
  userInfo: PropTypes.string,
  posts: PropTypes.array,
  boards: PropTypes.array,
  currentBoard: PropTypes.number,
  onBespin: PropTypes.func,
  handleFetchBoard: PropTypes.func,
  handleMakeBoard: PropTypes.func
};

export default Profile;
