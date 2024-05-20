require("dotenv").config();
const errorHandler = require("./ErrorHandler");
const UserModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN = process.env.TOKEN;

const LoginUser = async (req, res) => {
  // getting all the information for login like mobile number and password
  // check the user is valid or not
  // not valid ==> send user not valid or found
  // valid ==> continue
  // check the password through bcryptjs
  // password is valid ==> continue
  /// password is not valid ==> send wrong password
  // create a token using jsonwebtoken
  // send the token with the user to the users
  // Login System Done ✅
  try {
    let { mobile, password } = req.body;

    let user = await UserModel.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ status:404, message: "user not found" });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        errorHandler(err, res);
      }
      if (!result) {
        return res.status(401).json({status:401, message: "invalid creadentials" });
      }
      let token = jwt.sign({ id: user._id }, TOKEN);
      res
        .status(200)
        .json({status:200, message: "user logged In Successfuly", user, token });
    });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const RegisterUser = async (req, res) => {
  // get all the information for creating a new account like mobile and password
  // check the user is already exist or not
  // exist ==> send user is already exist please login
  // not exist ==> continue
  // hash the passwrod using bcryptjs
  // create a new user using userModel
  // save the user using userModel.save();
  // create a token using jsonwebtoken
  // send the token to user and the newly created user too
  // Registration done ✅
  try {
    let { mobile, password } = req.body;
    let existingUser = await UserModel.findOne({ mobile });
    if (existingUser) {
      return res.status(403).json({status:403, message: "user already exist" });
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let newUser = new UserModel({ mobile, password: hash });
    let savedUser = await newUser.save();
    let token = jwt.sign({ id: savedUser._id }, TOKEN);
    res.status(201).json({
      status:201,
      message: "user Registered Successfully",
      user: savedUser,
      token,
    });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const LoginALoggedInUser = async (req, res) => {
  try {
    // the middalware function checks the user is valid or not
    // the user gets verified then a new token is created and token is shared to user
    // and the user also sent to user
    // Login successfull ✅
    let LoginToken = jwt.sign({ id: req.user._id }, TOKEN);
    res.json({
      message: "Login Successfull",
      user: req.user,
      token: LoginToken,
    });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

module.exports = { LoginUser, RegisterUser, LoginALoggedInUser };
