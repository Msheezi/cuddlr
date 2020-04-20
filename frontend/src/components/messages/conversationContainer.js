import { connect } from "react-redux";

import { Conversations } from "./conversations";
import { postMessage, fetchConversations, fetchThread} from '../../actions/message_actions'

const msp = (state) => {

  let messages = Object.keys(state.messages).map(messageKey=> state.messages[messageKey])
  return {

    currentUserId: state.session.user.id,
    messages: messages
  }
};

const mdp = (dispatch) => ({
  fetchConversations: (id)=> dispatch(fetchConversations(id)),
  fetchThread: (id) => dispatch(fetchThread(id)),
  postMessage: (message) => dispatch(postMessage(message))

});

export default connect(msp, mdp)(Conversations);
