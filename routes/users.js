const express = require("express");
const router = express.Router();
const User = require("../models/user");

// index view
router.get("/", (req, res) => {
  User.find().then(users => {
    res.json(users);
  });
});

// create new user
router.post("/", (req, res) => {
  const body = req.body;
  tempUser = {};
  // loop through all sent fields and populate object
  // save object and send object to front end
  Object.keys(body).forEach(key => {
    if (!tempUser[key]) {
      tempUser[key] = body[key];
    }
  });

  const newUser = new User(tempUser);

  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});

// Current users Likes
router.get("/:id/likes", (req, res) => {
  let currentUser;
  Like.find({ _id: currentUser }).then(likes => res.send(json(likes)));
});

module.exports = router;

// const {
//   username,
//   age,
//   location,
//   gender,
//   targetGender,
//   cuddleStyle,
//   cuddlePosition,
//   headline,
//   description
// } = req.body;
// const newUser = new User({
//   username: username,
//   age: age,
//   location: location,
//   gender: gender,
//   targetGender: targetGender,
//   cuddleStyle: cuddleStyle,
//   cuddlePosition: cuddlePosition,
//   headline: headline,
//   description: description
// });
