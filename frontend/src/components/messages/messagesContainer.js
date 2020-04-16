import { connect } from "react-redux";

import { Messages } from './messages'

const msp = state => ({
    currentUserId: state.session.user.id
})


const mdp = dispatch => ({

})


export default connect(msp, mdp)(Messages);