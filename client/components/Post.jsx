import React from 'react';
import PropTypes from 'prop-types';
import Heart from '../assets/Heart.jsx';
require('../stylesheets/main.css');

class Post extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      showHeart: false
    }
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.handleHeart = this.handleHeart.bind(this);
  }

  handleHeart(e) {
    console.log('sup');
  }

  mouseEnter(e) {
    this.setState({
      style: {
        filter: 'brightness(0.6)'
      },
      showHeart: true
    });
  }

  mouseLeave(e) {
    this.setState({
      style: {},
      showHeart: false
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
        {this.state.showHeart ? <Heart style={heartStyle} onClick={() => console.log('hello')} /> : null}
        <img src={this.props.photoUrl} alt={this.props.photoInfo} onClick={this.props.handleClick} />
        <div className="post_info">
          {this.props.showInfo ? <p>{this.props.photoInfo}</p> : null}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
	photoUrl: PropTypes.string,
	photoInfo: PropTypes.string,
	showInfo: PropTypes.bool,
	handleClick: PropTypes.func
};

export default Post;
