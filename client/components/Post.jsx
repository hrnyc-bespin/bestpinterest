import React from 'react';
import PropTypes from 'prop-types';
import Heart from '../assets/Heart.jsx';

/**
 * Base level class with ability to manage current display state
 */
class Post extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      showHeart: false,
      showInfo: false
    }
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleHeart(this.props.photoId);
  }

  /**
   * Hover handlers
   * @param {*} e 
   */
  mouseEnter(e) {
    this.setState({
      style: {
        filter: 'brightness(0.6)'
      },
      showHeart: true,
      showInfo: true
    });
  }

  mouseLeave(e) {
    this.setState({
      style: {},
      showHeart: false,
      showInfo: false
    });
  }

  render() {

    return (
      <div className="post_main" style={this.state.style} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <img src={this.props.photoUrl} alt={this.props.photoInfo} />
        {this.state.showHeart ? <Heart onClick={this.handleClick} /> : null}
        {this.state.showInfo ? 
          (<div className="post_info">
            <p>{this.props.photoInfo}</p>
          </div>) : null}
      </div>
    );
  }
}

Post.propTypes = {
  photoId: PropTypes.number,
	photoUrl: PropTypes.string,
	photoInfo: PropTypes.string,
	showInfo: PropTypes.bool,
	handleHeart: PropTypes.func
};

export default Post;
