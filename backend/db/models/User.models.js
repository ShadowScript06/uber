const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: [3, "Firstname must be at least 3 characters or long"],
  },
  lastname: {
    type: String,
    minlength: [3, "Lastname must be at least 3 characters or long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 letters long or more"],
    select: false,
  },
  socketId: {
    type: String,
  },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
