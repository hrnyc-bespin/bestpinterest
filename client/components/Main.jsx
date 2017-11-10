import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Wall from './Wall.jsx';
import Profile from './Profile.jsx';
import AddPhoto from './AddPhoto.jsx';

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
      showAddPhoto: false,
      posts: [],
      boards: []
    };
    this.handleBespin = this.handleBespin.bind(this);
    this.handleMakeBoard = this.handleMakeBoard.bind(this);
    this.handleFetchBoard = this.handleFetchBoard.bind(this);
    this.handleAddPhoto = this.handleAddPhoto.bind(this);
    this.onAddPhoto = this.onAddPhoto.bind(this);
  }

  componentDidMount() {
    axios
      .get('/board', {
        params: {
          boardId: -1
        }
      })
      .then(response => {
        this.setState({
          posts: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  // User pressed on heart over a photo
  handleBespin(postId, boardId) {
    console.log('postId', postId); // Passed up from Profile.jsx
    console.log('boardId', boardId);
    axios
      .post('/bespin', {
        postid: postId,
        boardid: boardId
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // User pressed Add Board
  handleMakeBoard(boardName) {
    console.log('userId', this.props.user.id);
    console.log('boardName', boardName);
    axios
      .post('/makeboard', { name: boardName, userId: this.props.user.id })
      .then(
        axios
          .get(`/board?userId=${this.props.user.id}`)
          .then(data => this.setState({ boards: data.data }))
      )
      .catch(err => console.log(err));
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
      axios
        .post('/post', {
          photourl: photoUrl,
          info: photoInfo
        })
        .then(axios.get('/post').then(res => setState({ posts: res.data })))
        .catch(err => {
          console.log(err);
        });
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="main">
        <Profile
          username={this.props.user.username}
          profilePic={this.props.user.profilepic}
          userInfo={this.props.user.info}
          boards={[]}
          posts={this.state.posts}
          handleBespin={this.handleBespin}
          handleFetchBoard={this.handleFetchBoard}
          handleMakeBoard={this.handleMakeBoard}
        />
        {this.state.showAddPhoto ? (
          <AddPhoto handleAddPhoto={this.handleAddPhoto} />
        ) : null}
        <button className="add_photo_button" onClick={this.onAddPhoto}>
          +
        </button>
      </div>
    );
  }
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  boards: PropTypes.array
};

export default Main;
