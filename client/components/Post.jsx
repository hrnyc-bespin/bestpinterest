import React from 'react';
import PropTypes from 'prop-types';

var Post = (props) => {
  return (
    <div>
      <h1>Post</h1>
      <img src={photoUrl} alt={photoInfo} onClick={props.handleClick} />
      {showInfo ? <p>{photoInfo}</p> : null}
    </div>
  );
}

Post.propTypes = {
  photoUrl: PropTypes.string,
  photoInfo: PropTypes.string,
  showInfo: PropTypes.number,
  handleClick: PropTypes.func
};

export default Post;