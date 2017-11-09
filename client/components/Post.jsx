import React from 'react';
import PropTypes from 'prop-types';
import Heart from '../assets/Heart.jsx';
require('../stylesheets/main.css');

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

  handleClick(e) {
    this.props.handleHeart()
  }

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
    let heartStyle = {
      'position': 'absolute',
      'top': '16px',
      'right': '16px'
    };

    return (
      <div className="post_main" style={this.state.style} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <img src={this.props.photoUrl} alt={this.props.photoInfo} />
        {this.state.showHeart ? <Heart style={heartStyle} onClick={this.handleClick} /> : null}
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
