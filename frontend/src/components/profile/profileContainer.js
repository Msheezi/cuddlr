import { connect } from "react-redux";

import {Profile} from './profile'
import {openModal, closeModal} from '../../actions/ui_actions'

const msp = state => ({
    currentUserId: state.session.user.id
})

const mdp = dispatch => ({
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal())

})


export default connect(msp, mdp,)(Profile);