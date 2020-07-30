import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
//import "./navbar.css";
//import {Container, StyledH1, LinkButton, LinksContainer} from './navbarcomponents'

 const Container = styled.div`
  background: transparent;
  width: 100%;
  /* background-color: #B3D5DB; */
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
  width: 100px;
  height: 25px;
  /* background: transparent; */
  background: #58A4B0;
  border: 1px solid white;
  text-align: center;
  margin: 0px 2px ;
  align-self: flex-end;
  color: #fff;
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 50px;
  line-height: 25px;
  &:hover{
    color: #fff;
    background-color: #3899E5;
    border-color: #1e7e34;
  }
`;

const NavButton = styled.div`
width: 100px;
height: 25px;
cursor:pointer;
  /* background: transparent; */
  background: #58A4B0;

  border: 1px solid white;
  text-align: center;
  margin: 0px 2px ;
  align-self: flex-end;
  color: #fff;
  box-sizing: border-box;
  border-radius: 50px;
  line-height: 25px;

  
  &:hover{
   color: #fff;
    background-color: #3899E5;
    border-color: #1e7e34;
  }
  padding: 0px;
`


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
           
          <LinkButton to={`/users/${this.props.currentUserId}`}> My Profile</LinkButton>
          <LinkButton to={`/likes/`}> My Likes</LinkButton>
          <LinkButton to={"/messages"}>Messages</LinkButton>
          <NavButton onClick={this.logoutUser}>Logout</NavButton>
        </LinksContainer>
       
      );
    } else {
      return (
        <LinksContainer>
          <LinkButton to="/register">Sign Up </LinkButton>
          <LinkButton to="/login">Login </LinkButton>
        </LinksContainer>
      );
    }
  }

  render() {
    return (
      <Container>
        <Link to={'/home'} style={{textDecoration: "none"}}><StyledH1>Cuddlr</StyledH1></Link>
        {this.getLinks()}
      </Container>
    );
  }
}

export default NavBar;
