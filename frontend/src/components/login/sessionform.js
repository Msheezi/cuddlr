import React from 'react'
import styled from 'styled-components'
import useSignUpForm from './CustomHooks'
import { login, register } from '../../actions/session_actions'

const FormContainer = styled.form`
display:flex;
flex-direction:column;
text-align: center;
padding: 5% 10% 10% 10%;
justify-content: space-around;
`

const InputField = styled.input`
margin-bottom: 20px;
`
const StyledLabel = styled.label`
    color: #2e3443;
`


const SessionForm = () => {
    const{inputs, handleInputChange, handleSubmit} = useSignUpForm(login)
    return (
        <FormContainer onSubmit={handleSubmit}>
            <StyledLabel>Username</StyledLabel>
            <InputField type="text" name="username" onChange={handleInputChange} value={inputs.username}/>
            <StyledLabel>Password</StyledLabel>
            <InputField type="password" name="password" onChange={handleInputChange} value={inputs.password}/>
            <button type="submit" >Login</button>
        </FormContainer>
    )
}

export default SessionForm