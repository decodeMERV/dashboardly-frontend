import React, {Component} from 'react';
import './DeleteBoard.css';
import onClickOutside from 'react-onclickoutside';
import api from '../../api';
import {withRouter} from 'react-router';
import auth from '../../auth';

class DeleteBoard extends Component{
  constructor(props){
    super(props);
    this.state ={
    }
  }

  handleClickOutside = () => {
    this.props.closeDeleteBoard(); //This method should be defined in Home.js
  }

  _handleDeleteBoard = () => {
    api.deleteBoard(this.props.deleteBoardId, auth.getToken())
      .then(res => {
        this.props.router.push('/');
        this.props.closeDeleteBoard(true);
      })
      .catch(error => this.setState({error: "Error during DELETING to backend " + error}))
  }

  render(){
    return (
      <div className={`deleteBoard ${this.props.show?"show":""}`}>
        <h2>Delete {this.props.deleteTitle} </h2>
        <button onClick={this._handleDeleteBoard}>Delete</button>
        <button onClick={this.props.closeDeleteBoard}>Cancel</button>
        <h4>{this.state.error ? "Error: " + this.state.error : ""}</h4>
      </div>
    );
  }
}

export default withRouter(onClickOutside(DeleteBoard));