import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import "./app.css";

import MainPage from "./main/main_page";
import NavBarContainer from "./nav/navbar_container";
import LoginFormContainer from "./login/login_form_container";
import SignupFormContainer from "./login/signup_form_container";
import UserFeed from "./index/userFeed";
import ProfileContainer from "./profile/profileContainer";
import PhotoManagerContainer from "./photomanager/photoManagerContainer";
import ConversationsContainer from "./messages/conversationContainer";
import ModalContainer from "./messages/messageModalContainer";
import LikesFeed from './index/likedUsers'
import ReactGA from 'react-ga'

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 12pt;
  text-align: center;
`;

function initializeReactGA() {
  ReactGA.initialize("UA-179340407-1");
  ReactGA.pageview("/homepage");
}

const App = () => 
{
  initializeReactGA()

return (
  <div>
    <NavBarContainer />
    <ModalContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/register" component={SignupFormContainer} />
      <ProtectedRoute exact path="/home" component={UserFeed} />
      <ProtectedRoute exact path="/likes" component={LikesFeed} />
      
      <ProtectedRoute
        exact
        path="/messages"
        component={ConversationsContainer}
      />
      <ProtectedRoute exact path="/users/:id" component={ProfileContainer} />
      <ProtectedRoute
        exact
        path="/photoman"
        component={PhotoManagerContainer}
      />
    </Switch>
    {/* <Footer>Copyright &copy; 2020 Cuddlr</Footer> */}
  </div>
);
}
export default App;
