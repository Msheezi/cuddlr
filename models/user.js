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

  passwordDigest: {
    type: String,
    required: true
  },

  dob: {
    type: Date,
     // want to do the calculation on the validation, if date entered doesn't make you 18, fail it
     // 
    required: true,
    //default: Date.now // commented because don't create user if under 18
  },


  location: {
    type: String, // thinking this should be updated at login with a 
    // geolocation thing, translate this to get location on front end
    required: true
  },

  mainProfilePic: {
    type: Array
    // this updates when user adds a new photo and sets it as primary, updates value here?
  },

  headline: {
    type: String,

  },

  description: {
    type: String,

  },

  gender: {
    type: String, //(M, F, T, NB),
    ///  should you do a model with the id and descript for genders, allow more
    required: false
  },

  targetGender: {
    type: String, //(M, F, T, NB)
    ///  should you do a model with the id and descript for genders, allow more
    required: false
  },

  cuddleStyle: {
    type: String,
    // should i do a collection for the different styles and reference an ID here
    required: false
  },

  cuddlePostion: {
    type: String,
    // should i do a collection for the different positions and reference an ID here
    required: false
  }

  
 
});

module.exports = User = mongoose.model("users", UserSchema);
