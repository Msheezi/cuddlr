import { RECEIVE_MESSAGED_USERS } from "../actions/message_actions";
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions'

import _ from "lodash";

const MessagedUsersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState
  switch (action.type) {
    case RECEIVE_MESSAGED_USERS:
      // newState = {}
      // action.users.data.forEach(el => (newState[el._id] = el))
      // return Object.assign({}, state, newState)
      return { ...state, ..._.mapKeys(action.users.data, "_id") };
    case RECEIVE_USER_LOGOUT:
      newState = {}
      return newState
    default:
      return state;
  }
};

export default MessagedUsersReducer;
