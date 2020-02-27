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
// need to include the current user id and the user id that is being liked.  will need to have that user ID in the front end
