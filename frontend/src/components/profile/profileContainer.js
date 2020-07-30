import { connect } from "react-redux";

import {Profile} from './profile'
import {openModal, closeModal} from '../../actions/ui_actions'
import {likeUser, unlikeUser} from '../../actions/user_actions'

const msp = state => ({
    currentUserId: state.session.user.id,
    likes: state.likes
})

const mdp = dispatch => ({
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
    likeUser: (userId, likedUser) => dispatch(likeUser(userId, likedUser)),
    unlikeUser: (userId, likedUser) => dispatch(unlikeUser(userId, likedUser))


})


export default connect(msp, mdp,)(Profile);