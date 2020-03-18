import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import LoginForm from './login';



const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        signedIn: state.session.isSignedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        
        signup: user => dispatch(signup(user))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);