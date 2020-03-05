import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className='navbar-links-logged'>
          <Link to={"/Home"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>
          {/* <Link to={"/new_tweet"}>Write a Tweet</Link> */}
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className='navbar-links-not-logged'>
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='bar'>
        <h2>Cuddlr</h2>
        <div className='links'>
        {this.getLinks()}
        </div>
      </div>
    );
  }
}

export default NavBar;
