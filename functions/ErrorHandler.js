const handleError = (err, res) => {
  if (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "something went wrong please try again later" });
  }
};

module.exports = handleError;
