const mongoose = require('mongoose')
const Profile = mongoose.Schema()

const ProfileSchema = new Profile({
    userId: {
        type: String,
        required: true
    },

    profilePics: {
        type: Array
    },

    headline: {
        type: String, 

    },

    description: {
        type: String, 

    },

    gender: {
        type: String, //(M, F, T, NB)
        required: true
    },

    targetGender: {
        type: String, //(M, F, T, NB)
        required: false
    },

    cuddleStyle: {
        type: String,
        required: false
    },

    cuddlePostion: {
        type: String,
        required: false
    },
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)