import React from 'react';

export default (props) => (
  <div className="add-button">
    <i className="fa fa-trash-o fa-2x" onClick={props.onClick}/>
  </div>
);