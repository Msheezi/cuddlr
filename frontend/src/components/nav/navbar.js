import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
//import "./navbar.css";
//import {Container, StyledH1, LinkButton, LinksContainer} from './navbarcomponents'

 const Container = styled.div`
  background: transparent;
  width: 100%;
  background-color: #B3D5DB;
  margin: 0;
  padding: 0;
  height: 75px;
  overflow: hidden;
  position: relative;

`;
const LinksContainer = styled.div`
 position: absolute;
 bottom: 2px;
 right:3px;
 display: flex;
 flex-direction: row;
  margin: 0px 2px;
  justify-content: flex-end;
  width: 100%;
  
`;

 const StyledH1 = styled.h1`
  text-align: center;
  font-size: 20pt;
  padding: 2px;
  margin-top: 10px;
  padding: 10px;
  line-height: 0.7em;
  font-family: 'Luckiest Guy', cursive;
  color: #F4C3C2;
  font-size:45pt;
  text-shadow: 0 0 3px white;
  /* color: #2e3443; */
`;

 const LinkButton = styled(Link)`
  width: 150px;
  background: transparent;
  border: 1px solid white;
  text-align: center;
  margin: 0px 2px ;
  align-self: flex-end;
  color: black;
  &:hover{
    background-color:green;
  }
`;


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
        <LinksContainer>
          <LinkButton onClick={()=> this.logoutUser()}>Logout </LinkButton> 
          <LinkButton to={"/profile"}>Home</LinkButton>
          <button onClick={this.logoutUser}>Logout</button>
        </LinksContainer>
       
      );
    } else {
      return (
        <LinksContainer>
          <LinkButton to="/register">Register </LinkButton>
          <LinkButton to="/login">Login </LinkButton>
        </LinksContainer>
      );
    }
  }

  render() {
    return (
      <Container>
        <StyledH1>Cuddlr</StyledH1>
        {this.getLinks()}
      </Container>
    );
  }
}

export default NavBar;
