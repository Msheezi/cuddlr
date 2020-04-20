import * as messagesAPI from '../util/messages_util'

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS"
export const RECEIVE_THREAD = "RECEIVE_THREAD"

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

export const postMessage = (message) => dispatch =>(
    messagesAPI.postMessage(message).then(message=> dispatch(receiveMessage(message)))
)

export const fetchConversations = (id) => dispatch => (
    messagesAPI.getConversationList(id).then(conversations => dispatch(receiveConversations(conversations)))
)

export const fetchThread = (id) => dispatch => (
    messagesAPI.getThreadByConvoId(id).then(thread => dispatch(receiveThread(thread)))
)