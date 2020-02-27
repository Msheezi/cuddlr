const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    conversationId: {
        type: String,
        required: true
    }, 

    sender: {
        type: String, 
        required: true
    },

    content: {
        type: String,
        required: true
    },
    timeSent: {
        type: Date,
        default: Date.now
    }

    // do you need other fields in this and linking in the routes for
    //finding the correct matching for the conversations and groupings
    // displayed in user profile, conversations, will have messages they 
    // are a part of, Conversation.find({ userId: inlcudes current user(if array)})
    // sort these by the create date 


})

module.exports = Message = mongoose.model('messages', MessageSchema)