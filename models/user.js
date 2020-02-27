const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number, // maybe have this be calculated so it updates every time the user is updated, thuse users age but don't have to update it
    required: true
  },
  location: {
    type: String,
    required: true
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

  headline: {
    type: String,
    required: false
  },

  description: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
