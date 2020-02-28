const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String, 
    required: true
  },

  password: {
    type: String,
    required: true
  },

  dob: {
    type: Date, // maybe have this be calculated so it updates every time the user is updated, thuse users age but don't have to update it
    required: true,
    default: Date.now
  },


  location: {
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
    required: false
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
  }

  
 
});

module.exports = User = mongoose.model("users", UserSchema);
