import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Wall from './Wall.jsx';
import Profile from './Profile.jsx';
import AddPhoto from './AddPhoto.jsx';
import AddBespin from './AddBespin.jsx';

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
      showBespin: false,
      posts: [],
      boards: [],
      currentBoard: -1,
      // Used for handling Bespin
      currentPost: null
    };
    this.onBespin = this.onBespin.bind(this);
    this.handleBespin = this.handleBespin.bind(this);
    this.handleMakeBoard = this.handleMakeBoard.bind(this);
    this.handleFetchBoard = this.handleFetchBoard.bind(this);
    this.handleFetchUserBoards = this.handleFetchUserBoards.bind(this);
    this.handleAddPhoto = this.handleAddPhoto.bind(this);
    this.onAddPhoto = this.onAddPhoto.bind(this);
  }

  // Fetch all public posts upon initial load and user's board ids
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
        return this.handleFetchUserBoards();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Axios.get /userboards, params is id (userId);
  // status codes 200 or 400, 200 is ok, but 400 means error with query

  // User pressed on heart over a photo
  onBespin(postId) {
    if (this.state.boards.length === 0) {
      return alert("you don't have any boards yet!");
    }
    this.setState({
      showBespin: true,
      currentPost: postId
    });
  }

  handleBespin(postId, boardId, cancel) {
    if (cancel) {
      return this.setState({
        showBespin: false,
        currentPost: null
      });
    }
    if (this.props.helper.validateBespin(postId, boardId)) {
      axios
        .post('/bespin', {
          postId: postId,
          boardId: boardId
        })
        .then((res) => {
          console.log('successful');
        })
        .catch((err) => {
          console.log(err);
          alert("Couldn't save your post!");
        });
    } else {
      alert("Invalid post params, where's the debugger");
    }
    this.setState({
      showBespin: false,
      currentPost: null
    });
  }

  // User pressed Add Board
  handleMakeBoard(boardName) {
    if (this.props.helper.validateBoardName(boardName)) {
      axios
        .post('/makeboard', { name: boardName, id: this.props.user.id })
        .then((res) => {
          return this.handleFetchUserBoards();
        })
        .catch((err) => console.log(err));
    } else {
      alert('Invalid board name');
    }
  }

  // fetching the posts that associated with clicked board
  handleFetchBoard(boardId) {
    axios
      .get('/board', {
        params: {
          boardId: boardId
        }
      })
      .then((res) => {
        this.setState({
          posts: res.data
        });
      })
      .catch((err) => console.log(err));
  }

  handleFetchUserBoards(userId = this.props.user.id) {
    axios
      .get('/userboards', {
        params: {
          id: userId
        }
      })
      .then(res => {
        this.setState({
          boards: res.data.boards
        });
      })
      .catch(err => {
        console.log(err);
        alert('error fetching your boards');
      });
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
          this.setState({
            showAddPhoto: false
          });
          return this.handleFetchBoard(this.state.currentBoard);
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

  render() {
    // No matter what boards we fetch, should always have at least the public board
    // ID of -1 indicates to server that we want all posts
    let boardsWithPublic = [{ name: 'Public Board', id: -1 }].concat(
      this.state.boards
    );
    let posts = this.state.posts.sort((a, b) => a.id - b.id);
    console.log(posts);
    return (
      <div className="main">
        <Profile
          userId={this.props.user.id}
          username={this.props.user.username}
          profilePic={this.props.user.profilepic}
          userInfo={this.props.user.info}
          posts={posts}
          boards={boardsWithPublic}
          currentBoard={this.state.currentBoard}
          onBespin={this.onBespin}
          handleFetchBoard={this.handleFetchBoard}
          handleMakeBoard={this.handleMakeBoard}
        />
        {this.state.showAddPhoto ? (
          <AddPhoto
            helper={this.props.helper}
            handleAddPhoto={this.handleAddPhoto}
          />
        ) : null}
        {this.state.showBespin ? (
          <AddBespin
            postId={this.state.currentPost}
            boards={this.state.boards}
            handleBespin={this.handleBespin}
          />
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
