import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post.jsx';

// For testing purposes only

/**
 * Photowall used in both the main page and on a per user basis
 * Expects an array of posts from the wrapping app component
 *
 * TODO: Change this to functional stateless if supported?
 */
class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.handleHeart = this.handleHeart.bind(this);
  }

  handleHeart(postId) {
    this.props.handleBespin(postId, this.props.boardId);
  }

  render() {
    return (
      <div className="wall_main">
        {this.props.posts.length > 0
          ? this.props.posts.map((post, i) => (
              <Post
                key={i}
                photoId={post.id}
                photoUrl={post.photourl}
                photoInfo={post.info}
                handleHeart={this.handleHeart}
                showInfo={this.props.showInfo}
              />
            ))
          : 'add posts!'}
      </div>
    );
  }
}

Wall.propTypes = {
  boardId: PropTypes.number,
  posts: PropTypes.array,
  showInfo: PropTypes.bool,
  handleBespin: PropTypes.func
};

export default Wall;
