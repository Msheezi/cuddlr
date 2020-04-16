const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = new Schema({
    userId: {  // pick one, either this or participants
        type: String,
        required: true
    },

    participants: {
        type: Array,
        required: true
    },
    
    created: { // can technically get this from the document ID
        type: Date,
        default: Date.now
    }

})

module.exports = Conversation = mongoose.model('conversations', ConversationSchema)

// do i need to include both the participants in this table
// if i do the array, remove the userID field.  the model then just has a convoId and participants
// if including userID, change participant to a string and just match based off that?
// just want one long thread between two users

// Planning to include both participants document IDs in the conversation participants array
// when referencing, will be able to pull in the info from the other user for front end
// don't need the created, the document ID has the time stamp