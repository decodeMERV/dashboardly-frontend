import React, {Component} from 'react';
import './CreateBookmark.css';
import api from '../../api';
import onClickOutside from 'react-onclickoutside';
//import Board from '../pages/Board';
import {withRouter} from 'react-router';
import auth from '../../auth';

const ENTER = 13;
const CHARLIMIT = 80;

class CreateBookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result:"",
      currentInput:""
    };
  }
  handleClickOutside = (e) => {
    this.props.closeCreateBookmark();
  }
  handleClick = () => {
    if(this.refs.title.value === "" || this.refs.url.value ===""){
        this.setState({result: "You're missing the title or the link!"})
    }
    else if(this.refs.title.value && this.refs.url.value){
          api.createBookmark(this.refs.title.value, this.refs.url.value, this.refs.description.value, this.props.params.id, auth.getToken())
          .then(res=> {
            this.props.router.push(`/boards/${this.props.params.id}`);
            this.props.closeCreateBookmark(true);
          })
          .catch(error => {
            console.log("Error during creating bookmark", error)
          })
    }
  }
  _handleTyping = (e) => {
   if (this.state && this.state.error) {
     this.setState({ error: null })
   }
   if (e.keyCode===ENTER) {
    this.handleClick()
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
  render() {
    return (
      <div className={`createBookmark ${this.props.show?"show":""}`}>
        <h1>Create New Place </h1>

          <input placeholder='Title' type='text' ref='title' onKeyUp={this._handleTyping}/>
          <input placeholder='Url' type='text' ref='url' onKeyUp={this._handleTyping}/>
          <input placeholder='Description' type='text' ref='description' onKeyUp={this._handleTyping} onInput={this._handleInput} value={this.state.currentInput}/>
          <button type='submit' onClick={this.handleClick}>Create </button>
          <h4> {this.state.error?"Error: " + this.state.error : ""} <span>{this.state.currentInput.length}/80</span> </h4>

        <h5> {this.state.result} </h5>
      </div>
    );
  }

}

export default withRouter(onClickOutside(CreateBookmark));
