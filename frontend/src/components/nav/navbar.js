import React from "react";
// import styled from 'styled-components'
import { Link } from "react-router-dom";
import "./navbar.css";
import {Container, StyledH1, LinkButton, LinksContainer} from './navbarcomponents'


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
          <LinkButton>Home </LinkButton> 
          <LinkButton>Logout </LinkButton> 
          {/* <Link to={"/Home"}>Home</Link> */}
          {/* <Link to={"/profile"}>Profile</Link> */}
          {/* <Link to={"/new_tweet"}>Write a Tweet</Link> */}
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="navbar-links-not-logged">
          <LinkButton>Register </LinkButton>
          <LinkButton>Login </LinkButton>
          {/* <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link> */}
        </div>
      );
    }
  }

  render() {
    return (
      <Container>
        <StyledH1>Cuddlr</StyledH1>
        <LinksContainer>{this.getLinks()}</LinksContainer>
      </Container>
    );
  }
}

export default NavBar;
