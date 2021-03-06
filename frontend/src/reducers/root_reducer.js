import {combineReducers} from 'redux'
import session from './session_reducer'
import errors from './errors_reducer'
import MessagesReducer from './messages_reducer'
import MessagedUsersReducer from './messagedUsers_reducer'
import uiReducer from './ui_reducer'
import LikesReducer from './likes_reducer'


const RootReducer = combineReducers({
    session,
    errors,
    conversations: MessagesReducer,
    messagedUsers: MessagedUsersReducer,
    ui: uiReducer,
    likes: LikesReducer
})


export default RootReducer