import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './modals/Menu';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      isAppClicked : false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) { //Useful for not re-rendering the main menu...
    //NB: This conditional is necessary as if we did not have this we would not re-render the app when we do a this.props.router.push() as this lifecycle method would not return true when we change routes. Note that the below logic is necessary so we don't re-render the app everytime we click something due to the onOutsideClick HOC in Menu child component. Here I was able to override this method so we could have 1) the flexibilty of rerouting and re-rendinger 2) less render cycles on clicks outside of menu (less CPU processing). This took some time to figure out! Mainly I learned about this lifecycle method gets called during setState even if the state value does not change so we need to make some checks. However, we're then restricting the normal life cycle so we have to implement MORE checks to allow things we want.
    if (this.props.location.pathname !== nextProps.location.pathname ){
      return true;
    }
    if (this.state.isMenuOpen === nextState.isMenuOpen){
      if (this.state.isAppClicked === nextState.isAppClicked){
        return false;
      }
      return true;
    }
    return true;
  }

  closeMenu = () => this.setState({ isMenuOpen: false })

  userClicked = () => this.setState({ isAppClicked : !this.state.isAppClicked })

  render() {
    console.log("RENDERED APP");
    console.log(this.state.isMenuOpen);
    console.log(this.state.isAppClicked);
    let {isMenuOpen} = this.state
    return (
      <div className="App">
        <div className="App-navbar" >
          <i className="fa fa-bars fa-2x menu-icon"
            onClick={()=>this.setState({ isMenuOpen: !isMenuOpen })}/>
          <Link to="/" className="App-navbar__title" onClick={this.userClicked}>
            Dashboardly
          </Link>
          <i className="fa fa-cog fa-2x settings-icon" onClick={this.userClicked}/>
        </div>

        <Menu show={isMenuOpen} closeMenu={this.closeMenu}/>

        {this.props.children}

      </div>
    );
  }
}

export default App;
