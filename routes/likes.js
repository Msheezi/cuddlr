const express = require("express");
const router = express.Router();
const Like = require("../models/like");

router.post("/users/:id/newLike", (req, res) => {
  newLike = new Like({
    username: currentUser,
    likedUser: req.body.likedUser
  });
});

module.exports = router;
