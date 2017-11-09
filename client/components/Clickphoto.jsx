import React from 'react';
import PropTypes from 'prop-types';

class ClickPhoto extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img
          src={this.props.photoUrl}
          alt={this.props.photoInfo}
          onClick={this.props.handleClick}
        />
        {this.state.showInfo ? (
          <div className="post_info">
            <p>{this.props.photoInfo}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ClickPhoto;
