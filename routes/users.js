const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const UserPicture = require('../models/userPicture')
const Like = require('../models/like')
const keys = require('../config/keys')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const validateLoginInput = require('../validation/login')
const validateRegisterInput = require('../validation/register')

const excludedUserFields = { "password": 0, "email": 0, "__v": 0}
const pictureFields = {"profilePrimary": 1, "userId": 1, "pictureUrl": 1, "_id": 1}
const likesFields = {"_id": 1}
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

  const username = req.body.username
  const password = req.body.password


  User.findOne({username})
  .then(user => {
    if (!user) {
      errors.username = "User not Found"
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
    username: req.user.username
    
   
  })
})

// get user likes id

router.get("/currentUserLikes/:id", (req,res)=>{
  userId = req.params.id
  User.findById(userId,{"likes":1})
  .then(likesArray=> res.json(likesArray))
})

// index view
router.get("/", (req, res)=>{
  User.find({},excludedUserFields)
  .then(users=> {
    res.json(users)
  })
// should add some pagination here but will depend on seed data

})

// Retrieve User

router.get("/:id", (req,res)=>{
  const userId = req.params.id;
  User.find({ "_id": userId }, excludedUserFields)
  .then(user => res.json(user) ) 
  })
  // add the search in to get the pictures for the user


// Update User Profile

router.patch("/:id", (req, res)=> {
  // pass fields through validator
  const userId = req.params.id 
  let updatedUser = req.body
  
  User.findOneAndUpdate({ "_id": userId }, updatedUser, { new: true, fields: excludedUserFields} ).then(user => res.json(user))
  
})
// Get Current Users Likes
router.get("/:id/likes", (req, res) => {
  let currentUser;
  Like.find({ "_id": currentUser }).then(likes => res.send(json(likes)));
});



/// Add Liked user
    /* 
      should the insert be an object or just a simple array, adds are easy, removes could be tough
      search through entire array and remove value
      have to ensure the same user isn't liked more than once or isn't contained in the array
      more than once
      set variable to indexOf key, if not found, push, if not found, push
    */
router.post("/like/new", (req,res) =>{
  let user = req.query.userId
  let likedUser = req.query.likedUser
  User.findOneAndUpdate({"_id": user }, 
  {$push:{likes: likedUser }}, 
    { new: true, fields: likesFields} )
    .then(() => res.json(likedUser))
    // res.json(likedUser)
})


// remove liked user
/*
  should the insert be an object or just a simple array, adds are easy, removes could be tough
  search through entire array and remove value
  have to ensure the same user isn't liked more than once or isn't contained in the array
  more than once
*/

router.post("/like/delete", (req, res) => {
  let user = req.query.userId
  let unlikedUser = req.query.likedUser
  
  User.findOneAndUpdate({ "_id": user },
    { $pull: { likes: unlikedUser } },
    { new: true, fields: likesFields })
    .then(()=>res.json(unlikedUser))
    // .then(likeduser => res.json(likeduser))
})

// get liked users

router.get("/like/users", (req, res) =>{
  let user = req.query.userId

  // get the user Id to get the likes.  filter users by users in likes table?
  User.findById(user, {"likes": 1})
  .then(likedUserArray =>{
    // const likesArray = likedUserArray["likes"]
    
    

    User.find({ "_id": { $in: [...likedUserArray.likes] } },
     excludedUserFields, 
      (err,docs) => {
      res.json(docs)
    })
      
  })

  // likedUserObjs = Users.find({"_id" :{"$in": likedUserIds}})

  // .then(likedUserObjs => {
  //   console.log(likedUserObjs)
  //   res.json(likedUserObjs)})

 
})

//get profile pics

router.get("/userPics/:id", (req,res)=>{
  const userId = req.params.id
  UserPicture.find({"userId": userId}, pictureFields).then(userPictures => res.json(userPictures))
})


// make primary route

router.patch("/makeprimary/:id", (req, res) => {
  
  let userId = req.params.id
  User.findOneAndUpdate({ "_id": userId }, { "mainProfilePic": req.body.mainProfilePic }, { new: true, fields: excludedUserFields }).then(user => res.json(user))
  
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
