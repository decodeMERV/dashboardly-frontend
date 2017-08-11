import React, { Component } from 'react';
import auth from '../auth';
import './Logout.css';

export default class Logout extends Component{

  _handleLogout = () => {
    this.props.clickedLogout();
    auth.logout()
      .catch( error => alert("Could not log you out, " + error) )
  }

  render(){
    return(
      <a className="logout" onClick={this._handleLogout}>
          {this.props.buttonText}
      </a>
    );
  }
}