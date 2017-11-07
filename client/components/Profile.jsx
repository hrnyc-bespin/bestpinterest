import React from 'react';
import PropTypes from 'prop-types';
import Wall from './Wall.jsx';
require('../stylesheets/profile.css');

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBoardClick(e) {

  }

  render() {
    return (
      <div>
        <div className="user_summary">

        </div>
        <div className="user_board_nav">

        </div>
        <div className="board_wall">

        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string,
  profilePic: PropTypes.string,
  userInfo: PropTypes.string,
  board: PropTypes.array
};

export default Profile;