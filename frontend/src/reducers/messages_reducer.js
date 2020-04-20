import { RECEIVE_MESSAGE,
RECEIVE_CONVERSATIONS,
RECEIVE_THREAD} from '../actions/message_actions'

const MessagesReducer = (state ={}, action) => {
    Object.freeze(state);
    let newState 
    switch (action.type) {
        case RECEIVE_CONVERSATIONS:
            newState = { }
            action.conversations.data.forEach(el=>(newState[el._id]=el))
            return Object.assign({}, state, newState)
        case RECEIVE_MESSAGE:
            newState = Object.assign({}, state)
            newState[action.data.message._id] = action.message;
        case RECEIVE_THREAD: 

        default: 
        return state

    }
}

export default MessagesReducer