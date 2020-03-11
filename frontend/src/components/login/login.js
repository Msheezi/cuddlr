import React from 'react'
import styled from 'styled-components'
import SessionForm from './sessionform'
import { AutoScaling } from 'aws-sdk'


const LoginContainer = styled.div`
    border: 1px solid lightblue;
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 50px;
    width: 35%;
    min-height: 60vh;
    align-items:center;
    
    /* margin: 0 auto;  */
`

const Accent = styled.span`
font-family: 'Luckiest Guy', cursive;
  color: #F4C3C2;
  text-shadow: 0 0 3px red;
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
                <h3 >Login to get your <Accent >Cuddle</Accent> On!</h3>
            <SessionForm/>

            </LoginContainer>
            )
        
    }
    
}

export default Login