import React from 'react'
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import {Switch} from 'react-router-dom'
import styled from 'styled-components'


import MainPage from './main/main_page'
import NavBarContainer from './nav/navbar_container'
import LoginFormContainer from './login/login_form_container'
import SignupFormContainer from './login/signup_form_container'
import UserFeed from './index/userFeed'
import ProfileContainer from './profile/profileContainer'

const Footer = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 12pt;
    text-align: center;
`

const App = () => (
    <div>
   
    <NavBarContainer/>
    

    <Switch>
        <AuthRoute exact path="/" component={MainPage}/>
        <AuthRoute exact path="/login" component={LoginFormContainer}/>
        <AuthRoute exact path="/register" component={SignupFormContainer}/>
        {/* <AuthRoute exact path="/messages" component={MessagesContainer}/> */}
        <ProtectedRoute exact path="/home" component={UserFeed}/>
            <ProtectedRoute exact path="/users/:id" component={ProfileContainer}/>
    </Switch>
        <Footer>
            Copyright &copy; 2020 Cuddlr
        </Footer>
    </div>
)

export default App