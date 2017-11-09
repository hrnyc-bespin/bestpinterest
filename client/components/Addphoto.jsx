import React from 'react';
import PropTypes from 'prop-types';

// Handles form submissions
class Addphoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
      description: ''
    };
    this.setChange = this.setChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e, cancel) {
    e.preventDefault();
    this.props.handleAddPhoto(this.state.photoUrl, this.state.description, cancel);
  }

  render() {
    return (
      <div className="add_photo_form">
        <form>
          <p>photo url</p>
          <input type="text" name="photoUrl" onChange={this.setChange} />
          <p>description</p>
          <input type="text" name="description" onChange={this.setChange} />
          <button onClick={this.onSubmit}>
            Submit
          </button>
          <button onClick={(e) => this.onSubmit(e, true)}>Cancel</button>
        </form>
      </div>
    );
  }
}

Addphoto.propTypes = {
  handleAddPhoto: PropTypes.func
};

export default Addphoto;
