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

  // Fetch all public posts upon initial load
  componentDidMount() {
    axios
      .get('/board', {
        params: {
          boardId: -1
        }
      })
      .then(res => {
        this.setState({
          posts: res.data
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
    if (this.props.helper.validateBespin(postId, boardId)) {
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
          alert('There was an error attempting to pin this post');
        });
    } else {
      alert('There was an error attempting to pin this post');
    }
  }

  // User pressed Add Board
  handleMakeBoard(boardName) {
    console.log('userId', this.props.user.id);
    console.log('boardName', boardName);
    if (this.props.helper.validateBoardName(boardName)) {
      axios
      .post('/makeboard', { name: boardName, id: this.props.user.id })
      .then(res => this.setState({ boards: res.data })
        // res =>
        //   res.status === 201
        //     ? axios.get('/board').then(data => this.setState({ boards: data }))
        //     : console.log(err)
      )
      .catch(err => console.log(err));
    } else {
      alert('Invalid board name');
    }
  }

  // Need to handle initial fetch, probably using react lifecycle methods.
  // Will need to do this today.
  handleFetchBoard(boardId) {
    console.log('boardId', boardId); // Board ID
    console.log('exampleQuery', `/boards?=${boardId}`);
    axios
      .get(`/board?userId=${boardId}`)
      .then(res => this.setState({ posts: res.data }));
  }

  // If cancel is true, user pressed cancel button
  // Photo validated by AddPhoto for UI purposes
  // Axios by default handles non-ok status codes as errors
/*
This needs to refetch the currently selected boards, but we
aren't adding a board id association at time of upload
*/

  handleAddPhoto(photoUrl, photoInfo, cancel = false) {
    if (!cancel) {
      axios
        .post('/post', {
          photourl: photoUrl,
          info: photoInfo
        })
        .then((res) => {
          alert('posted! refresh to view (sorry)');
          this.setState({
            showAddPhoto: false
          });
        })
        .catch((err) => {
          alert('There was a problem trying to upload that photo :(');
        });
    } else {
      this.setState({
        showAddPhoto: false
      });
    }
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
    let boardsWithPublic = []
    return (
      <div className="main">
        <Profile
          userId={this.props.user.id}
          username={this.props.user.username}
          profilePic={this.props.user.profilepic}
          userInfo={this.props.user.info}
          posts={this.state.posts}
          handleBespin={this.handleBespin}
          handleFetchBoard={this.handleFetchBoard}
          handleMakeBoard={this.handleMakeBoard}
        />
        {this.state.showAddPhoto ? (
          <AddPhoto 
            helper={this.props.helper}
            handleAddPhoto={this.handleAddPhoto} />
        ) : null}
        <button className="add_photo_button" onClick={this.onAddPhoto}>
          +
        </button>
      </div>
    );
  }
}

Main.propTypes = {
  helper: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  boards: PropTypes.array
};

export default Main;
