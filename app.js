const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

const users = require("./routes/users");
const likes = require("./routes/likes");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongo"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", users);
app.use("/likes", likes)

app.listen(port, () => console.log(`Server is running on port ${port}`));
