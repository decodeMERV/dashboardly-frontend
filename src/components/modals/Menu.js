import React, { Component } from 'react';
import { Link } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import api from '../../api';
import './Menu.css';
import Logout from "../Logout";


class Menu extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  handleClickOutside = () => {
    this.props.closeMenu();
  }

  componentDidMount(){
    this.fetchProfilePic()
  }

  fetchProfilePic = () => {
     return api.getProfilePic()
     .then(res => {
       this.setState({
         url : res.body.avatarUrl
       });
     })
  }

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
              <Logout buttonText="Logout"/>
            </div>
          : null}
        </div>

      </div>
    );
  }

}

export default onClickOutside(Menu);
