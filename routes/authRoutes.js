const express = require("express");
const router = express.Router();
const {
  LoginALoggedInUser,
  LoginUser,
  RegisterUser,
} = require("../functions/authFunctions");

// middalware
const { authMiddalware } = require("../middalware/authMiddalware");

router.route("/login").post(LoginUser).get(authMiddalware, LoginALoggedInUser);
router.post("/register", RegisterUser);

module.exports = router;
