const ProductModel = require("../model/productsModel");
const errorHandler = require("./ErrorHandler");
const BannerModel = require("../model/adminModels/bannerModel");

const getAllBannerImages = async (req, res) => {
  try {
    let bannerImages = await BannerModel.find({});
    res.status(200).json(bannerImages);
  } catch (err) {
    cosole.log(err);
    errorHandler(err, res);
  }
};

module.exports = {
  getAllBannerImages,
};
