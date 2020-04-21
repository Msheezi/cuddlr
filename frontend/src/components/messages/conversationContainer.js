import { connect } from "react-redux";

import { Conversations } from "./conversations";
import { postMessage, fetchConversations, fetchThread, fetchMessagedUsers} from '../../actions/message_actions'

const msp = (state) => {

  let messages = Object.keys(state.messages).map(messageKey=> state.messages[messageKey])
  // let messagedUsers = Object.keys(state.messagedUsers).map(messagedUsersKey => state.messagedUsers[messagedUsersKey])
  return {

    currentUserId: state.session.user.id,
    messages: messages,
    messagedUsers: state.messagedUsers
  }
};

const mdp = (dispatch) => ({
  fetchConversations: (id)=> dispatch(fetchConversations(id)),
  fetchThread: (id) => dispatch(fetchThread(id)),
  postMessage: (message) => dispatch(postMessage(message)),
  fetchMessagedUsers: (id) => dispatch(fetchMessagedUsers(id))

});

export default connect(msp, mdp)(Conversations);
