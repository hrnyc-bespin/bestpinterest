import React from 'react';
import PropTypes from 'prop-types';

/**
 * Handles the controlled component
 */
class AddBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      boardName: e.target.value
    })
  }

  render() {
    return (
      <div className="add_form add_board_form">
        <div className="add_board_name">
          <p>What's the new board name?</p>
          <input type="text" value={this.state.boardName} onChange={this.onChange} />
        </div>
        <button onClick={() => this.props.boardAdded(this.state.boardName)}>Submit</button>
        <button onClick={() => this.props.boardAdded(null, true)}>Cancel</button>
      </div>
    );
  }
}

AddBoard.propTypes = {
  boardAdded: PropTypes.func
}

export default AddBoard;