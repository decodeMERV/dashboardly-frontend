import React, {Component} from 'react';
import './SignUp.css';
import auth from "../../auth";

const ENTER = 13;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleSignUp = () => {
    let email = this.refs.email.value;
    let password = this.refs.pw.value;
    if (email && password) { //i.e. if they exist
      auth.signUp(email, password)
        .then(res => {
          this.props.router.push('/login')
        })
        .catch( (error) => {
          this.setState({error: "Something went wrong with the sign up authorization process" + error})
        });
    }
    else {
      this.setState({error : "Please enter the email and password!"}) //email and pw ommitted
    }
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({error: null});
    }
    if (e.keyCode === ENTER) {
      this._handleSignUp();
    }
  };

  render() {
    return (
      <div className="signUp">
        <h1> Sign up for Dashboardly</h1>
        <input type="text" placeholder="username" ref="email" onKeyUp={this._handleTyping}/>
        <input type="password" placeholder="password" ref="pw" onKeyUp={this._handleTyping}/>
        <button onClick={this._handleSignUp}>Sign Up!</button>
        <h4>{this.state.error}</h4>
      </div>
    );
  }

}
