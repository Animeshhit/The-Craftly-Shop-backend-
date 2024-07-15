const express = require("express");
const router = express.Router();
const {
  LoginALoggedInUser,
  LoginUser,
  RegisterUser,
  updateProfile,
} = require("../functions/authFunctions");

// middalware
const { authMiddalware } = require("../middalware/authMiddalware");
const userDataValidate = require("../validators/userValidator");
const userValidatorSchema = require("../validatorSchemas/userValidatorSchema");

router
  .route("/login")
  .post(userDataValidate(userValidatorSchema), LoginUser)
  .get(authMiddalware, LoginALoggedInUser);
router.post("/register", userDataValidate(userValidatorSchema), RegisterUser);
router.post("/updateProfile", authMiddalware, updateProfile);

module.exports = router;
