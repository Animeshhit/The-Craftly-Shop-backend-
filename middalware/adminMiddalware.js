require("dotenv");
const errorHandler = require("../functions/ErrorHandler");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const adminMiddalware = async (req, res, next) => {
  try {
    let token = req.query.adminapikey;
    let user;

    if (!token) {
      return res.status(403).json({ message: "token is invalid" });
    }
    const decodedData = await jwt.verify(token, process.env.TOKEN);
    let { id } = decodedData;

    try {
      user = await userModel.findOne({ _id: id });
    } catch (err) {
      console.log(err);
      return errorHandler(err, res);
    }
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.isAdmin == true || user.isAdmin) {
      req.user = user;
    } else {
      return res
        .status(403)
        .json({ message: "you have no permission for this operation" });
    }

    next();
  } catch (err) {
    console.log(err);
    errorHandler(err.res);
  }
};

module.exports = { adminMiddalware };
