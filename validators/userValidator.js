const errorHandler = require("../functions/ErrorHandler");

const userDataValidate = (schema) => async (req, res, next) => {
  try {
    const refinedData = schema.safeParse(req.body);
    if (!refinedData.success) {
      res.status(500).json({ message: refinedData.error.errors[0].message });
      return;
    }
    req.body = refinedData.data;
    next();
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

module.exports = userDataValidate;
