const express = require("express");
const router = express.Router();
const User = require("../models/user");
const UserPicture = require('../models/userPicture')


// index view
// router.get("/", (req, res) => {
//   let profileUsers = {}
//   User.find().then(users => {
//     // returns array of objects, want to add a key to user object
//     // 
//     users.forEach(obj => {
//       //obj._doc

//       let pictureURLs = []
//       obj._doc["pictures"] = []
//       UserPicture.find({userId: obj._doc._id}, {pictureUrl: 1, _id:0})
//       .then(pictureArray => {
//         console.log(pictureArray)
//         pictureArray.forEach(pictureObject => {
//           // console.log("Picture Object:", pictureObject)
//           // console.log("Picture Object._doc:",pictureObject._doc)
//           // pictureURLs.push(pictureObject._doc["pictureUrl"])
//           obj._doc["pictures"].push(pictureObject["pictureUrl"])
//         })
//         // obj._doc[pictureArray] = pictureURLs
       
//       })
//     })
//     res.json(users);
//   });
// });

router.get("/", (req,res)=>{
  // make sure in the aggregations, you used the mongo table name
  User.aggregate([
    // {$project: {
    //   "pictureURLS":{
    //     "pictureUrl": 1
    //   }
    // }},
    {"$addFields": {"id": {"$toString": "$_id"}}}, // this stringifies the _id field so you can match on it
    {$lookup: {
      "from": "userpictures",
      "localField": "id",
        "foreignField": "userId",
        "as": "pictureURLs"
    }
  },
  // {$project: {"pictureURLS": {"pictureUrl": 1}}}
])
    
  // User.find().then(users => {
  //   users.aggregate([{
  //     $lookup: {
  //       from: UserPicture.find(), 
  //       localField: "_id",
  //       foreignField: "userId",
  //       as: "pictureURLs"
  //     }
  //   }])
  // })
  // users.aggregate([{$lookup: {
  //     from: userPictures,
  //     localField: "_id", 
  //     foreignField: "userId",
  //     as: "pictureURLs"
  //   }}])
    .then(combinedUsers => res.json(combinedUsers))
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
