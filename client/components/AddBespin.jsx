import React from 'react';
import PropTypes from 'prop-types';

var AddBespin = (props) => {
  var handleBespin = (e) => {
    props.handleBespin(props.postId, e.target.value);
  }

  return (
    <div className="add_form">
      <ul style={{'height': '300px'}}>
        {props.boards.map((board, i) => {
          return <li key={i} value={board.id} onClick={handleBespin}>{board.name}</li>
        })}
      </ul>
      <button onClick={()=>props.handleBespin(null, null, true)}>Cancel</button>
    </div>
  );
}

AddBespin.propTypes = {
  postId: PropTypes.number,
  boards: PropTypes.array,
  handleBespin: PropTypes.func
};

export default AddBespin;