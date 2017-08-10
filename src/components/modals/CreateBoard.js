import React, {Component} from 'react';
import './CreateBoard.css';
import onClickOutside from 'react-onclickoutside';
import api from '../../api';
import { withRouter } from 'react-router'
import auth from '../../auth';

const ENTER = 13;
const CHARLIMIT = 80;

class CreateBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput : ""
    };
  }

  handleClickOutside = () => {
    this.props.closeCreateBoard(); //This method should be defined in Home.js
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._handleCreateBoard()
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

  _handleCreateBoard = () => {
    if (this.refs.title.value === "" || this.refs.desc.value === "") {
      this.setState({ error: "Please both the title and description!  "})
    }
    else if (this.refs.title.value && this.refs.desc.value) {
      api.createBoard(this.refs.title.value, this.refs.desc.value, auth.getToken())
        .then(res => this.props.router.push(`/boards/${res.body.id}`))
    }
  }

  render() {
    return (
      <div className={`create-board ${ this.props.show ? "show" : ""}`}>
        <h1>Create a new Board</h1>
        <input type="text" ref="title" placeholder="Title" onKeyUp={this._handleTyping}/>
        <input type="text" ref="desc" placeholder="Description" onKeyUp={this._handleTyping} onInput={this._handleInput} value={this.state.currentInput}/>
        <button onClick={this._handleCreateBoard}>Create</button>
        <h4> {this.state.error?"Error: " + this.state.error : ""} <span>{this.state.currentInput.length}/80</span> </h4>
      </div>
    );
  }

}
export default withRouter(onClickOutside(CreateBoard));
