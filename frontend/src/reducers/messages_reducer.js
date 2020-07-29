import {
  // RECEIVE_MESSAGE,
  RECEIVE_CONVERSATIONS,
  //   RECEIVE_THREAD,
} from "../actions/message_actions";
import { RECEIVE_USER_LOGOUT} from '../actions/session_actions'

const MessagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_CONVERSATIONS:
      newState = {};
      action.conversations.data.forEach((el) => (newState[el._id] = el));
      return Object.assign({}, state, newState);
    // case RECEIVE_MESSAGE:
    //   newState = Object.assign({}, state);
    //   newState[action.message.data._id] = action.message.data;
      // return newState
    // case RECEIVE_THREAD:
    case RECEIVE_USER_LOGOUT:
      newState= {}
      return newState

    default:
      return state;
  }
};

export default MessagesReducer;
