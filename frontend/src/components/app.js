import React from 'react'
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import {Switch} from 'react-router-dom'


import MainPage from './main/main_page'
import NavBarContainer from './nav/navbar_container'
import Login from './login/login'

const App = () => (
    <div>
    {/* // <div style={{ backgroundColor: "lightgrey", height: "100%" }}> */}
    <NavBarContainer/>
    

    <Switch>
        <AuthRoute exact path="/" component={MainPage}/>
        <AuthRoute exact path="/login" component={Login}/>
        {/* <AuthRoute exact path="/login" component={LoginFormContainer}/> */}
        {/* <AuthRoute exact path="/register" component={RegisterFormContainer}/> */}
    </Switch>
    
    </div>
)

export default App