import { connect } from "react-redux";

import {Profile} from './profile'

const msp = state => ({
    currentUserId: state.session.user.id
})

const mdp = dispatch => ({

})


export default connect(msp, mdp,)(Profile);