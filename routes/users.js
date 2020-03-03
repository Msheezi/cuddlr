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
  let userId = req.params.id;

  let userProfile = {}
  User.find({"_id": userId})
  .then(user => {
    let obj = user[0]
    // console.log(user[0])
    // console.log( typeof user[0])
    // console.log(Object.keys(obj));
    Object.keys(obj._doc).forEach(key => {  
      //obj._doc is the reference to the 
      // actual document returned, there are various other fields want to omit
      if (key === "passwordDigest") return 
      
        userProfile[key] = obj[key]
      
    })

      // user is an array
      res.json(userProfile)
  })
  // add the search in to get the pictures for the user
})

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
