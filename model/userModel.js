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
  cart:{
    type:Array,
    default:[]
  },
  orders:{
    type:Array,
    default:[]
  },
  notifications:{
    type:Array,
    default:[]
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
