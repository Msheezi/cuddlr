const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  User.find().then(users => {
    res.json(users);
  });
});

router.post("/new", (req, res) => {
  
  const body = req.body
  tempUser = {}
  Object.keys(body).forEach(key => {
    if (!tempUser[key]) {
      tempUser[key] = body[key]
    }
  }) 

  // loop through all sent fields and populate object
  // save object and send object to front end
  
  const newUser = new User(tempUser)
  
  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});

router.get('/likes', (req, res)=> {
  let currentUser
  Like.find({_id: currentUser}).then(likes => res.send(json(likes)))
})

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