import { connect } from "react-redux";

import { PhotoManager } from './photomanager'

const msp = state =>({
    currentUserId: state.session.user.id
})


const mdp = dispatch => ({

})


export default connect(msp, mdp)(PhotoManager);