const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  userId: {
    type: String,
    required: true
  },

  likedUserId: {
    type: String,
    required: true
  }
});

module.exports = Like = mongoose.model("likes", LikeSchema);

// current userId = userId, liked user is received from front end
// conver objectID to string .str
//get timestamp from objectID .getTimestamp()
// need to include the current user id and the user id that is being liked.  will need to have that user ID in the front end
