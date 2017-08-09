import React, {Component} from 'react';
import './CreateBookmark.css';
import api from '../../api';
import onClickOutside from 'react-onclickoutside';
import Board from '../pages/Board';
import {withRouter} from 'react-router';

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
    this.props.closeBookmark();
  }
  handleClick = (e) => {
    e.preventDefault();

    if(this.refs.title.value === "" || this.refs.url.value ===""){
        this.setState({result: "You're missing the title or the link!"})
    }
    else if(this.refs.title.value && this.refs.url.value){

          api.createBookmark(this.refs.title.value, this.refs.url.value, this.refs.description.value, this.props.params.id)
          .then(res=> this.props.router.push(`/boards/${this.props.params.id}`))
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
      <div className={`button ${this.props.show?"show":""}`}>
        <h1>Create New Place </h1>
        <form>
          <input type='text' ref='title'/>
          <input type='text' ref='url'/>
          <input type='text' ref='description' onKeyUp={this._handleTyping} onInput={this._handleInput} value={this.state.currentInput}/>
          <button type='submit' onClick={(e)=>this.handleClick(e)}>Create </button>
          <h4> {this.state.error?"Error: " + this.state.error : ""} <span>{this.state.currentInput.length}/80</span> </h4>
        </form>
        <h5> {this.state.result} </h5>
      </div>
    );
  }

}

export default withRouter(onClickOutside(CreateBookmark));
