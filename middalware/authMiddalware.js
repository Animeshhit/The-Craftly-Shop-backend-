require("dotenv").config();
const errorHandler = require("../functions/ErrorHandler");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const authMiddalware = async (req, res, next) => {
  try {
    let token = req.query.apikey;
    let user;

    if (!token) {
      return res
        .status(403)
        .json({status:403, message: "bad request the api token is not present " });
    }

    const decodedData = await jwt.verify(token, process.env.TOKEN);
    let { id } = decodedData;

    try {
      // Wrap in a separate try block (optional)
      user = await userModel.findOne({ _id: id });
    } catch (err) {
      console.log("Error finding user:", err);
      errorHandler(err, res);
      return; // Exit the function if user lookup fails
    }

    if (!user) {
      return res.status(404).json({status:404, message: "user not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Error:", err);
    errorHandler(err, res);
  }
};

module.exports = { authMiddalware };
