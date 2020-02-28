const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const UserPictureSchema = new UserPicture({

    userId: {
        type: String, 
        required: true
    },
    pictureUrl: {
        type: String,
        required: true
    },

    profilePrimary: {
        type: Boolean,
        default: false,  
        required: true
    }
})

module.exports = UserPicture = mongoose.model('userPictures', UserPictureSchema)