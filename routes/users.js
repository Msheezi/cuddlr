const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const UserPicture = require('../models/userPicture')
const keys = require('../config/keys')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const validateLoginInput = require('../validation/login')
const validateRegisterInput = require('../validation/register')

const excludedUserFields = { "password": 0, "email": 0, }


//register route
router.post("/register", (req,res)=>{
  const {errors, isValid} = validateRegisterInput(req.body)
  
  if (!isValid){
    return res.status(400).json(errors)
  }
  let body = req.body

  User.findOne({email: req.body.email})
  .then(user=>{
    if(user){
      errors.email = 'Email already Exists'
      return res.status(400).json(errors)
    } else {
      const newUser = new User(body);
      bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if (err) throw err;
          newUser.password = hash
          newUser.save()
          .then(user => {
            const payload = {id:user.id, name: user.username}

            jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token)=>{
              res.json({
                success: true,
                token: "Bearer " + token
              })
            })

          })
          .catch(err => console.log(err))
        })
      })
      
    }

  })
})

//login
router.post('/login', (req, res)=>{
  const {errors, isValid} = validateLoginInput(req.body)

  if (!isValid){
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password


  User.findOne({email})
  .then(user => {
    if (!user) {
      errors.email = "User not Found"
      return res.status(404).json(errors)
    }
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (isMatch) {
        const payload = {id: user.id, name: user.name}

        jwt.sign(
          payload, 
          keys.secretOrKey,
          {expiresIn: 3600},
          (err, token)=>{
            res.json({success: true,
            token: 'Bearer ' + token
            })
          }
        )
      } else {
        errors.password = 'Bad Password Bro'
        return res.status(400).json(errors)
      }
    })
  })
})

// get current user
router.get("/current", passport.authenticate('jwt', {session: false}), (req,res)=>{
  res.json({
    id: req.user.id, 
    username: req.user.username,
    email: req.user.email
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

// 

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
