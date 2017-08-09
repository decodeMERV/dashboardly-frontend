import React, {Component} from 'react';
import './EditBoard.css';
import onClickOutside from 'react-onclickoutside';
import api from '../../api';
import {withRouter} from 'react-router';

const ENTER = 13;
const CHARLIMIT = 80;

class editBoard extends Component{

  constructor(props){
    super(props);
    this.state ={
      currentInput: ""
    }
  }

  handleClickOutside = () => {
    this.props.closeEditBoard(); //This method should be defined in Home.js
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._handleEditBoard()
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

  _handleEditBoard = () => {
    if (this.refs.title.value === "" || this.refs.desc.value ===""){
      this.setState({ error: "Please enter both fields! "})
    }
    else if (this.refs.title.value && this.refs.desc.value) {
      api.editBoard(this.props.editBoardId, this.refs.title.value, this.refs.desc.value)
        .then(res => {
          this.props.router.push('/');
          this.props.closeEditBoard();
        })
        .catch(error => this.setState({error: "Error during PATCHING to backend " + error}))
    }
  }


  render(){
    return(
      <div className={`editBoard ${this.props.show?"show":""}`}>
        <h2> Edit Board </h2>
        <input type="text" ref="title" placeholder="title" onKeyUp={this._handleTyping} />
        <input type="text" ref="desc" placeholder="description" onKeyUp={this._handleTyping}  onInput={this._handleInput} value={this.state.currentInput}/>
        <button onClick={this._handleEditBoard}>Edit Board</button>
        <h4> {this.state.error ? "Error: " + this.state.error : ""} <span>{this.state.currentInput.length}/80</span></h4>
      </div>
    );
  }
}
//TODO: use this.props.closeEditBoard() to close this popup
export default withRouter(onClickOutside(editBoard));