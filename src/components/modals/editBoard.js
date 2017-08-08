import React, {Component} from 'react';
import './editBoard.css';
import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import {withRouter} from 'react-router';


class editBoard extends Component{

  handleClickOutside = () => {
    this.props.closeCreateBoard(); //This method should be defined in Home.js
  }

  _handleEditBoard = () => {

  }


  render(){
    return(
      <div className={`editBoard `}>
        <h2> Edit Board </h2>
        <input type="text"/>
        <input type="text"/>
        <button onClick={this._handleEditBoard}>Process</button>
      </div>
    );
  }
}

export default withRouter(onClickOutside(editBoard));