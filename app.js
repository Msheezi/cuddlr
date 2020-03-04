require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const passport = require('passport')

const users = require("./routes/users");
const likes = require("./routes/likes");
const photoUpload = require("./routes/photoUpload")

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongo"))
  .catch(err => console.log(err));

app.use(passport.initialize())  
require('./config/passport')(passport)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.send("Now You're Cooking with Butter!");
});

app.use("/users", users);
app.use("/likes", likes)
app.use("/userPicture", photoUpload)

app.listen(port, () => console.log(`Server is running on port ${port}`));
