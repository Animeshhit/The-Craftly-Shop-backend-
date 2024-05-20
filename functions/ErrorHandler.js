const handleError = (err, res) => {
  if (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status:500, message: "something went wrong please try again later" });
  }
};

module.exports = handleError;
