import React from "react";
import { connect } from "react-redux";
import MessageModal from "./messageModal";
import { openModal, closeModal } from "../../actions/ui_actions";
import {postMessage} from '../../actions/message_actions'
const mapStateToProps = state => {
    return {
        currentUser: state.session.user.id,
        messageModalOpen: state.ui.messageModalOpen,
    };
};

const mapDispatchToProps = dispatch => ({
    postMessage: (message) => dispatch(postMessage(message)),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageModal);
