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
    this.handleAddphoto = this.handleAddphoto.bind(this);
  }

  setChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAddphoto(e) {
    e.preventDefault();
    this.props.handleAddphoto(this.state.photoUrl, this.state.description);
  }

  render() {
    return (
      <div className="addPhoto_form">
        <form>
          <p>photo url</p>
          <input type="text" name="photoUrl" onChange={this.setChange} />
          <p>descriotion</p>
          <input type="text" name="description" onChange={this.setChange} />
          <button className="add" onClick={this.handleAddphoto}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

Addphoto.propTypes = {
  handleAddphoto: PropTypes.func
};

export default Addphoto;
