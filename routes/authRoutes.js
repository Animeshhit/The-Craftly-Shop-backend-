const express = require("express");
const router = express.Router();
const {
  LoginALoggedInUser,
  LoginUser,
  RegisterUser,
  updateProfile
} = require("../functions/authFunctions");

// middalware
const { authMiddalware } = require("../middalware/authMiddalware");

router.route("/login").post(LoginUser).get(authMiddalware, LoginALoggedInUser);
router.post("/register", RegisterUser);
router.post("/updateProfile",authMiddalware,updateProfile);

module.exports = router;
