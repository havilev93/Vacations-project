const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  role: String,
});

module.exports = mongoose.model("_User", UserSchema);
