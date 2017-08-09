import React, {Component} from 'react';
import './EditBookmark.css';
import onClickOutside from 'react-onclickoutside';
import api from '../../api';
import {withRouter} from 'react-router';

const ENTER = 13;
const CHARLIMIT = 80;

class EditBookmark extends Component{

  constructor(props){
    super(props);
    this.state ={
      currentInput: ""
    }
  }

  handleClickOutside = () => {
    this.props.closeEditBookmark(); //This method should be defined in Board.js
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._handleEditBookmark()
    }
  }

  _handleInput = (e) => {
    var value = e.target.value;
    if (value !== this.state.currentInput){
      if (value.length <= CHARLIMIT) {
        this.setState({
          currentInput : value
        });
      }
    }
  }

  _handleEditBookmark = () => {
    if (this.refs.title.value === "" || this.refs.url.value ===""){
      this.setState({ error: "Please enter url and title! "})
    }
    else if (this.refs.title.value && this.refs.url.value){
      api.editBookmark(this.props.editBoardId, this.refs.title.value, this.refs.url.value, this.refs.desc.value)
        .then(res => {
          this.props.router.push(`/boards/${this.props.editBoardId}`);
          this.props.closeEditBookmark();
        })
        .catch(error => this.setState({error: "Error during PATCHING to backend " + error}))
    }
  }

  render(){
    return (
      <div className={`editBookmark ${this.props.show?"show":""}`}>
        <h2>Edit Bookmark</h2>
        <input type="text" ref="title" placeholder="title" onKeyUp={this._handleTyping} />
        <input type="text" ref="url"   placeholder="url"   onKeyUp={this._handleTyping} />
        <input type="text" ref="desc"  placeholder="desc"  onKeyUp={this._handleTyping} onInput={this._handleInput} value={this.state.currentInput} />
        <button onClick={this._handleEditBookmark}>Edit Bookmark</button>
        <h4> {this.state.error ? "Error: " + this.state.error : ""} <span>{this.state.currentInput.length}/80</span></h4>
      </div>
    );
  }

}

export default withRouter(onClickOutside(EditBookmark));