import React from 'react';
import PropTypes from 'prop-types';

/**
 * This caches the given prop, so that it can pass it back when the user
 * selects the desired board name
 * @param {*} props 
 */
var AddBespin = (props) => {
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