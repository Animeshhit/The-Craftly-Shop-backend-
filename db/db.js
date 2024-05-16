require("dotenv").config();
const mongoose = require("mongoose");

const MONGOURL = process.env.MONGOURL;

const connectToDb = async (callback) => {
  try {
    await mongoose.connect(MONGOURL);
    callback(true);
  } catch (err) {
    console.log(err);
    callback(false);
  }
};

module.exports = connectToDb;
