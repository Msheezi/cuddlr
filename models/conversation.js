const mongoose = require('mongoose')
const Converstaion = mongoose.Schema

const ConversationSchema = new ConversationSchema({
    userId: {
        type: String,
        required: true
    },

    participants: {
        type: Array,
        required: true
    },
    
    created: {
        type: Date,
        default: Date.now
    }

})

// do i need to include both the participants in this table
// if i do the array, remove the userID field.  the model then just has a convoId and participants
// if including userID, change participant to a string and just match based off that?
// just want one long thread between two users