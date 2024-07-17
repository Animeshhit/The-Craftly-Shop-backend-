require("dotenv").config();
const errorHandler = require("../functions/ErrorHandler");

const adminMiddalware = async (req, res, next) => {
  try {
    const { user } = req;
    if (!(user.isAdmin == true || user.isAdmin)) {
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
