import React, {Component} from 'react';
import './DeleteBookmark.css';
import onClickOutside from 'react-onclickoutside';
import api from '../../api';
import {withRouter} from 'react-router';

class DeleteBookmark extends Component {
  constructor(props){
    super(props);
    this.state ={
    }
  }

  handleClickOutside = () => {
    this.props.closeDeleteBookmark();
  }

  _handleDeleteBookmark = () => {
    api.deleteBookmark(this.props.deleteBMId)
      .then(res => {
        this.props.router.push(`/boards/${this.props.deleteBMBoardId}`);
        this.props.closeDeleteBookmark();
      })
      .catch(error => this.setState({error: "Error during DELETING to backend " + error}))
  }

  render(){
    return(
      <div className={`deleteBookmark ${this.props.show?"show":""}`}>
        <h2>Delete {this.props.deleteBMTitle}</h2>
        <button onClick={this._handleDeleteBookmark}>Delete</button>
        <button onClick={this.props.closeDeleteBookmark}>Cancel</button>
        <h4>{this.state.error ? "Error: " + this.state.error : ""}</h4>
      </div>
    );
  }
}

export default withRouter(onClickOutside(DeleteBookmark));