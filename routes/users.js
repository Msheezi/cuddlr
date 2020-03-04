const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const UserPicture = require('../models/userPicture')

const excludedUserFields = { "password": 0, "email": 0, }


//register route
router.post("/register", (req,res)=>{
  let body = req.body
  User.findOne({email: req.body.email})
  .then(user=>{
    if(user){
      return res.status(400).json({email: "Email already exists"})
    } else {
      const newUser = new User(body);
      bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if (err) throw err;
          newUser.password = hash
          newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
        })
      })
      
    }

  })
})

// index view
router.get("/", (req, res)=>{
  User.find({},excludedUserFields)
  .then(users=> {
    res.json(users)
  })
// should add some pagination here but will depend on seed data

})

// create new user
router.post("/", (req, res) => {
  const body = req.body;
  // tempUser = {};
  // // loop through all sent fields and populate object
  // // save object and send object to front end
  // Object.keys(body).forEach(key => {
  //   if (!tempUser[key]) {
  //     tempUser[key] = body[key];
  //   }
  // });

  // const newUser = new User(tempUser);
  const newUser = new User(body);

  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});

router.get("/:id", (req,res)=>{
  const userId = req.params.id;
  User.find({ "_id": userId }, excludedUserFields)
  .then(user => {res.json(user) }) 
  })
  // add the search in to get the pictures for the user


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
