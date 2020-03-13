import React from 'react'
import styled from 'styled-components'
import SessionForm from './sessionform'
import { Link, withRouter} from 'react-router-dom'



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

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: {}
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
       
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/tweets');
        }

        // Set or clear errors
        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(user);
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render(){

        return (
            
            <LoginContainer>
                <LoginHeadline >Login to get your <Accent >Cuddle</Accent> On!</LoginHeadline>
                <FormContainer onSubmit={this.handleSubmit}>
                    <StyledLabel>Username</StyledLabel>
                    <InputField type="text" name="username" onChange={this.update('username')} value={this.state.username} />
                    <StyledLabel>Password</StyledLabel>
                    <InputField type="password" name="password" onChange={this.update('password')} value={this.state.password} />
                    <button type="submit" >Login</button>
                    {this.renderErrors()}
                </FormContainer>
                <LoginRegister>Don't Have an Account? <Link to="/register">Register</Link></LoginRegister>
            </LoginContainer>
            )
        
    }
    
}

export default withRouter(LoginForm);




