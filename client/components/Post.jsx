import React from 'react';
import PropTypes from 'prop-types';
require('../stylesheets/main.css');



var Post = (props) => {
	let test;
	return (
		<div className="post_main">
			<img src={props.photoUrl} alt={props.photoInfo} onClick={props.handleClick} />
      <div className="post_info">
        {props.showInfo ? <p>{props.photoInfo}</p> : null}
      </div>
		</div>
	);
};

Post.propTypes = {
	photoUrl: PropTypes.string,
	photoInfo: PropTypes.string,
	showInfo: PropTypes.bool,
	handleClick: PropTypes.func
};

export default Post;
