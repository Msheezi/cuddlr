import * as messagesAPI from '../util/messages_util'

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS"
export const RECEIVE_THREAD = "RECEIVE_THREAD"
export const RECEIVE_MESSAGED_USERS = "RECEIVED_MESSAGED_USERS"

const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    message
})

const receiveConversations = (conversations) => ({
    type: RECEIVE_CONVERSATIONS,
    conversations
})


const receiveThread = (thread) =>({
    type: RECEIVE_THREAD,
    thread
})

const receivedMessageUsers = (users) => ({
    type: RECEIVE_MESSAGED_USERS,
    users
})

export const postMessage = (message) => dispatch =>(
    messagesAPI.postMessage(message).then(message=> dispatch(receiveMessage(message)))
)

export const fetchConversations = (id) => dispatch => (
    messagesAPI.getConversationList(id).then(conversations => dispatch(receiveConversations(conversations)))
)

export const fetchThread = (id) => dispatch => (
    messagesAPI.getThreadByConvoId(id).then(thread => dispatch(receiveThread(thread)))
)

export const fetchMessagedUsers = (id) => dispatch => (
    messagesAPI.getMessagedUsers(id).then(users => dispatch(receivedMessageUsers(users)))
)