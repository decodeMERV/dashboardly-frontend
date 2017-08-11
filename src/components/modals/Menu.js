import React, { Component } from 'react';
import { Link } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import './Menu.css';
import Logout from "../Logout";


class Menu extends Component {

  constructor(props){
    super(props);
    this.state = {
      url : ""
    };
  }

  handleClickOutside = () => {
    this.props.closeMenu();
  }

  componentDidMount(){
    this.fetchProfilePic()
  }

  componentDidUpdate(prevProps, prevState){
    // console.log(prevState, "prevState");
    // console.log(auth.isLoggedIn());
    if (auth.isLoggedIn()) {
      if(this.state.url.length <= 0 ){
        this.fetchProfilePic();
      }
    }
    else {
      if (this.state.url.length > 0){
        this.setState({ url: "" });
      }
    }
  }

  fetchProfilePic = () => {
    return auth.getCurrentLoggedInUser(auth.getToken())
      .then(res => {
        this.setState({
          url : res.body.avatarUrl
        });
      })
      .catch(error => {
        console.log("error, user not logged in to get pic " + error);
      })
  }

  changeLoggedIn = () => { this.setState({isUserLoggedIn : !this.state.isUserLoggedIn}) }

  render() {
    let { closeMenu, show } = this.props
    const isLoggedIn = auth.isLoggedIn()
    return (
      <div className={`menu ${show?"show":""}`}>

        <div className="menu__header">
          {this.state.url? <img src={this.state.url} alt="profile-pic" className="menu__avatar"/>
            : <div className="no__image"/> }
        </div>

        <div className="menu__list">

          <Link to="/" className="menu__item" onClick={closeMenu}>
            Home
          </Link>

          {!isLoggedIn ?
            <Link to="/login" className="menu__item" onClick={closeMenu}>
              Login
            </Link>
            : null}

          {!isLoggedIn ?
            <Link to="/signup" className="menu__item" onClick={closeMenu}>
              Signup
            </Link>
            : null}

          {isLoggedIn ?
            <div className="menu__item" onClick={closeMenu}>
              <Logout buttonText="Logout" clickedLogout={this.changeLoggedIn}/>
            </div>
            : null}
        </div>

      </div>
    );
  }

}

export default onClickOutside(Menu);