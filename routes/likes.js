const express = require("express");
const router = express.Router();
const Like = require("../models/like");

router.post("/new", (req, res) => { // old/users/:id/newLike"
  // parse the current user ID and the user id sent in the request
  
  newLike = new Like({
    userId: currentUser,
    likedUserId: req.body.likedUserId
  });

  newLike.save().then(like => {
    //update this to post the correct like into the redux state and fire correct functions
    res.json(like)
  })

});

router.delete("/delete", (req, res) => {
  Like.findByIdAndDelete({_id: req.body.id}).then(id => res.send(json(id))) 
   //check the syntax on this, it should send the ID back to redux to remove from the likes in memory
})



module.exports = router;
