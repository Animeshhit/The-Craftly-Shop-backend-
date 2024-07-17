const errorHandler = require("../functions/ErrorHandler");
const ctgModel = require("../model/ctgModel");

const getAllCtg = async (req, res) => {
  try {
    let ctgs = await ctgModel.find({});
    res.status(200).json(ctgs);
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

module.exports = { getAllCtg };
