import {
    RECEIVE_MESSAGED_USERS
} from '../actions/message_actions'
import _ from 'lodash'

const MessagedUsersReducer = (state ={}, action) => {
    Object.freeze(state);
    let newState 
    switch(action.type){
        case RECEIVE_MESSAGED_USERS:
        // newState = {}
        // action.users.data.forEach(el => (newState[el._id] = el))
        // return Object.assign({}, state, newState)
        return {...state, ..._.mapKeys(action.users.data, '_id')}
        default:
            return state
    }

}

export default MessagedUsersReducer
