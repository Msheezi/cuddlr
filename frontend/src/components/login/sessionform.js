import React from 'react'
import styled from 'styled-components'

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
    return (
        <FormContainer>
            <StyledLabel>Username</StyledLabel>
            <InputField type="text" name="username"/>
            <StyledLabel>Password</StyledLabel>
            <InputField type="password" name="password"/>

        </FormContainer>
    )
}

export default SessionForm