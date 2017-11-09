import React from 'react';
import PropTypes from 'prop-types';

// Handles form submissions
class AddPhoto extends React.Component {
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
      <div className="add_form add_photo_div">
        <form className="add_photo_form">
          <p>Photo url</p>
          <input type="text" name="photoUrl" onChange={this.setChange} />
          <p>Photo info</p>
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

AddPhoto.propTypes = {
  handleAddPhoto: PropTypes.func
};

export default AddPhoto;
