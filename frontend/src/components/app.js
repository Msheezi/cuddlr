import React from 'react'
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import {Switch} from 'react-router-dom'
import styled from 'styled-components'


import MainPage from './main/main_page'
import NavBarContainer from './nav/navbar_container'
import Login from './login/login'

const Footer = styled.footer`
    position: absolute;
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
        <AuthRoute exact path="/login" component={Login}/>
        {/* <AuthRoute exact path="/login" component={LoginFormContainer}/> */}
        {/* <AuthRoute exact path="/register" component={RegisterFormContainer}/> */}
    </Switch>
        <Footer>
            Copyright &copy; 2020 Cuddlr
        </Footer>
    </div>
)

export default App