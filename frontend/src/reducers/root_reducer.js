import {combineReducers} from 'redux'
import session from './session_reducer'
import errors from './errors_reducer'
import MessagesReducer from './messages_reducer'
import MessagedUsersReducer from './messagedUsers_reducer'


const RootReducer = combineReducers({
    session,
    errors,
    messages: MessagesReducer,
    messagedUsers: MessagedUsersReducer,
})


export default RootReducer