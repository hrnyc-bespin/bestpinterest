import React from 'react';
import PropTypes from 'prop-types';

/**
 * Responsible for managing and validating user-inputted photos
 * Note that no trace of who is posting the image is kept, anonymity for sci-fi
 * glory!
 */
class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
      info: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Needed to have controlled components
   * @param {*} e event object emitted by the onClick handler
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * Wrapper function for handling photo submissions. 
   * @param {*} e Event object emitted by the form
   * @param {*} cancel Optional parameter to allow for cancelling the form instead of submitting
   */
  onSubmit(e, cancel = false) {
    e.preventDefault();
    if (cancel) {
      // 3rd arg is to cancel
      return this.props.handleAddPhoto(null, null, cancel);
    }
    if (this.props.helper.validatePhoto(this.state.photoUrl, this.state.info)) {
      this.props.handleAddPhoto(this.state.photoUrl, this.state.info, cancel);
    } else {
      alert('Check your entry fields!');
    }
  }

  /**
   * Cancel button requires higher-order function for Main to remove this from DOM
   */
  render() {
    return (
      <div className="add_form add_photo_div">
        <form className="add_photo_form">
          <p>Photo url</p>
          <input type="text" name="photoUrl" onChange={this.onChange} value={this.state.photoUrl} />
          <p>Photo info</p>
          <input type="text" name="info" onChange={this.onChange} value={this.state.info} />
          <button onClick={this.onSubmit}>
            Submit
          </button>
          <button onClick={(e) => this.onSubmit(e, true)}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

AddPhoto.propTypes = {
  helper: PropTypes.object,
  handleAddPhoto: PropTypes.func
};

export default AddPhoto;
