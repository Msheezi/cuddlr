import React from 'react'
import styled from 'styled-components'
import SessionForm from './sessionform'
import { Link} from 'react-router-dom'



const LoginContainer = styled.div`
    border: 1px solid lightblue;
    display: flex;
    flex-direction: column;
    margin: 15vh auto;
    width: 35%;
    height: 40vh;
    align-items:center;
`

const Accent = styled.span`
font-family: 'Luckiest Guy', cursive;
  color: #F4C3C2;
  text-shadow: 0 0 3px red;
`
const LoginHeadline = styled.h3`
color: #2e3443;
`

const LoginRegister = styled.h3`
color: #2e3443;
font-size: 12pt;
`

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
            
        }
       
    }

    update(field){

    }

    render(){

        return (
            
            <LoginContainer>
                <LoginHeadline >Login to get your <Accent >Cuddle</Accent> On!</LoginHeadline>
            <SessionForm/>
                <LoginRegister>Don't Have an Account? <Link to="/register">Register</Link></LoginRegister>
            </LoginContainer>
            )
        
    }
    
}

export default Login