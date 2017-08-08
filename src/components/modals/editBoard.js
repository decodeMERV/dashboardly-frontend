import React, {Component} from 'react';
import './editBoard.css';
import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import {withRouter} from 'react-router';


class editBoard extends Component{
  render(){
    return(
      <div className={`editBoard `}>

      </div>
    );
  }
}

export default withRouter(editBoard);