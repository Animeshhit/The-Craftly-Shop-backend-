require("dotenv").config();
const errorHandler = require("../functions/ErrorHandler");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const authMiddalware = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7, authHeader.length); // Remove "Bearer " from string
    } else {
      token = null;
    }

    if (!token) {
      return res.status(403).json({
        status: 403,
        message: "bad request",
      });
    }

    jwt.verify(token, process.env.TOKEN, async (err, decodedData) => {
      if (err) {
        return res.status(403).json({
          message: "bad request",
        });
      }

      if (!decodedData.id) {
        return res.status(403).json({
          message: "bad request",
        });
      }

      let { id } = decodedData;

      let user = await userModel.findOne({ _id: id });

      if (!user) {
        return res.status(404).json({ status: 404, message: "bad request" });
      }

      req.user = user();
      next();
    });
  } catch (err) {
    console.log("Error:", err);
    errorHandler(err, res);
  }
};

module.exports = { authMiddalware };
