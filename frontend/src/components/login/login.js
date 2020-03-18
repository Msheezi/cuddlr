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
            password2:'',
            dob: '',
            email:'',
            hzip:'',
            errors: {}
            
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
       
    }

    // static getDerivedStateFromProps(nextProps){
    //     if (nextProps.signedIn === true){
    //         this.props.history.push('/login')
    //     }

    //    return { errors: nextProps.errors}
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

        // Set or clear errors
        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(user)
    }
    handleSignup(e) {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            dob: this.state.dob,
            email: this.state.email,
            homeZip: this.state.hzip
        };

        this.props.signup(user, this.props.history)
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

    renderLogin() {
        return (
            <>
            <LoginHeadline >Login to get your <Accent >Cuddle</Accent> On!</LoginHeadline>
            <FormContainer onSubmit={this.handleLogin}>
                <StyledLabel>Username</StyledLabel>
                <InputField type="text" name="username" onChange={this.update('username')} value={this.state.username} />
                <StyledLabel>Password</StyledLabel>
                <InputField type="password" name="password" onChange={this.update('password')} value={this.state.password} />
                <button type="submit" >Login</button>
                {this.renderErrors()}
            </FormContainer>
            <LoginRegister>Don't Have an Account? <Link to="/register">Register</Link></LoginRegister>
            </>
            )
    }

    renderRegister(){
        return (

            <>
            <LoginHeadline>Register to get your <Accent >Cuddle</Accent> On! </LoginHeadline>
                <FormContainer onSubmit={this.handleSignup}>
                    <StyledLabel>Username</StyledLabel>
                    <InputField type="text" name="username" onChange={this.update('username')} value={this.state.username} />
                    <StyledLabel>Email</StyledLabel>
                    <InputField type="text" name="email" onChange={this.update('email')} value={this.state.email} />
                    <StyledLabel>Enter a Password</StyledLabel>
                    <InputField type="password" name="password" onChange={this.update('password')} value={this.state.password} />
                    <StyledLabel>Re-enter Password</StyledLabel>
                    <InputField type="password" name="password2" onChange={this.update('password2')} value={this.state.password2} />
                    <StyledLabel>Enter Date of Birth</StyledLabel>
                    <InputField type="text" name="username" onChange={this.update('dob')} value={this.state.dob} />
                    <StyledLabel>Enter Home Zip</StyledLabel>
                    <InputField type="text" name="hzip" onChange={this.update('hzip')} value={this.state.hzip} />
                    
                    <button type="submit" >Register</button>
                    {this.renderErrors()}
                </FormContainer>
                <LoginRegister>Already Have an Account? <Link to="/login">Login</Link> here</LoginRegister>
            </>
            )
    }


    render(){

        let content 
        if (this.props.match.path === "/login") {
            content = this.renderLogin()
        } else if (this.props.match.path === "/register"){
            content = this.renderRegister()
        }

        


        return (
            <LoginContainer>

                {content}
            </LoginContainer>
            
            
            )
        
    }
    
}

export default withRouter(LoginForm);




