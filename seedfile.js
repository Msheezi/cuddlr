const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const passport = require('passport')
const User = require('./models/user');
const UserPicture = require('./models/userPicture')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Connected to Mongo"))
  .catch(err => console.log(err));

const userPictures = [
  "https://cuddlr-dev.s3-us-west-1.amazonaws.com/profileseeds/profile1-1.jpg",
  "https://cuddlr-dev.s3-us-west-1.amazonaws.com/profileseeds/profile1-2.jpg",
  "https://cuddlr-dev.s3-us-west-1.amazonaws.com/profileseeds/profile1-3.jpg",
  "https://cuddlr-dev.s3-us-west-1.amazonaws.com/profileseeds/profile1-4.jpg"
]

const addPictures = (pictureArray, username) => {

  User.findOne({username}, {"_id": 1}).then(user => {
    pictureArray.map(url=> {
      let pictureEntry = new UserPicture({"userId": user._id, "pictureUrl": url}) 
      pictureEntry.save()
    })
  })
}


addPictures(userPictures, "mango20" )


// const pics = {
//   //userID: { [piclinks]}
// };

// const uploadPics = picObject => {
//   let newPicEntry;
//   for (key in picObject) {
//     picObject[key].forEach(url => {
//       newPicEntry = { userId: key, pictureUrl: url };
//     });
//   }
// };


// const createUser = (userObj) => {

// }


// // import the model
// // create a new user by 