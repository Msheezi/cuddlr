const mongoose = require('mongoose')
const Profile = mongoose.Schema()

const ProfileSchema = new Profile({
    userId: {
        type: String,
        required: true
    },

    
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)

// keep all data on the user or add a profile model for the additional 
// data fields.  Pros / Cons