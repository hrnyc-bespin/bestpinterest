import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post.jsx';

/**
 * Photowall used in both the main page and on a per user basis
 * Expects an array of posts from the wrapping app component
 *
 * TODO: Change this to functional stateless if supported?
 */
class Wall extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Wall Stuff goes here</h1>
				{this.props.posts.map((post, i) => (
					<Post
						key={i}
						handleClick={this.props.handleClick}
						showInfo={this.props.showInfo}
						photoUrl={post.photoUrl}
						photoInfo={post.info}
					/>
				))}
			</div>
		);
	}
}

Wall.propTypes = {
	posts: PropTypes.array,
	showInfo: PropTypes.bool,
	handleClick: PropTypes.func
};

export default Wall;
