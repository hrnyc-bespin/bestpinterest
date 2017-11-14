import React from 'react';
import PropTypes from 'prop-types';

/*
 * Functional stateless component for fetching the clicked board. 
 * Post ID is given to the component in its props to simplify informing app.jsx
 */
var AddBespin = (props) => {

  // Function declared outside to make it more apparent what is happening
  var handleBespin = (e) => {
    props.handleBespin(props.postId, e.target.value);
  }

  return (
    <div className="add_form">
      <ul className="bespin_list">
        {props.boards.map((board, i) => {
          return <li className="bespin_elem"key={i} value={board.id} onClick={handleBespin}>{board.name}</li>
        })}
      </ul>
      <div className="button_holder">
        <button className="bespin_button" onClick={()=>props.handleBespin(null, null, true)}>Cancel</button>
      </div>
    </div>
  );
}

AddBespin.propTypes = {
  postId: PropTypes.number,
  boards: PropTypes.array,
  handleBespin: PropTypes.func
};

export default AddBespin;