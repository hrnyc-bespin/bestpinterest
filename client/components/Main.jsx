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

  ComponentDidMount() {
    axios.get('/post').then(res => this.setState({ posts: res.body.data }));
    axios.get('/board', { params: { boardId: this.props.user.id } }).then();
  }
  // User pressed on heart over a photo
  handleBespin(postId, boardId) {
    console.log('postId', postId); // Passed up from Profile.jsx
    console.log('boardId', boardId);
    console.log('postId', postId); // Passed up from Profile.jsx
    console.log('boardId', boardId);
    axios
      .post('/bespin', { postid: postId, boardid: boardId })
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
      .post('/makeboard', { name: boardName, id: this.props.user.id })
      .then(
        res =>
          res.status === 201
            ? axios.get('/board').then(data => this.setState({ boards: data }))
            : console.log(err)
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
        .then(res => {
          res.status === 200
            ? axios.get('/post').then(data => setState({ posts: data }))
            : console.log(err);
        })
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

  render() {
    return (
      <div className="main">
        <Profile
          username={Users.users[0].username}
          profilePic={Users.users[0].profilePic}
          userInfo={Users.users[0].info}
          boards={[{ id: 0, name: 'hey' }, { id: 1, name: 'yusaku' }]}
          handleBespin={this.handleBespin}
          handleFetchBoard={this.handleFetchBoard}
          handleMakeBoard={this.handleMakeBoard}
        />
        {this.state.showAddPhoto ? (
          <Addphoto handleAddPhoto={this.handleAddPhoto} />
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
  posts: PropTypes.array,
  boards: PropTypes.array
};

export default Main;
