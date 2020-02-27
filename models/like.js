const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  likedUser: {
    type: String,
    required: true
  }
});

module.exports = Like = mongoose.model("likes", LikeSchema);

// conver objectID to string .str
//get timestamp from objectID .getTimestamp()
