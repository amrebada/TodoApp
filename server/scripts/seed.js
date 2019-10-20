const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config.json");
const User = require("../src/models/users");

mongoose.connect(config.DB_URL, err => {
  if (err) {
    return console.log(" cannot connect to DB");
  }
  bcrypt.hash("admin", 10).then(hash => {
    let user = new User({
      username: "admin",
      password: hash,
      role: 1
    });
    user.save();
  });
});
