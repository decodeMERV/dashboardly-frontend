import React, { Component } from 'react';
import auth from '../auth';
import './Logout.css';

export default class Logout extends Component{

  _handleLogout = () => {
    auth.logout()
      .then( () => {console.log("nested loggedout"); this.props.clickedLogout()} ) //WE NEED to put this props method call after deleting the local storage cookie or else the app would rerender first before deleting the token and we would not see the erasure of the add, delete, edit buttons.
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