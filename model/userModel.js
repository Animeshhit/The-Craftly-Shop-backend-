const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    default: null,
  },
  email: { type: String, default: null },
  mobile: {
    type: Number,
    required: [true, "mobile Number is Required"],
    unique:true,
  },
  password: {
    type: String,
    required: [true, "password is Required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
