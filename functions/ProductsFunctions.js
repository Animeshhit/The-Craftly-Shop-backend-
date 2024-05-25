const ProductModel = require("../model/productsModel");
const errorHandler = require("./ErrorHandler");
const BannerModel = require("../model/adminModels/bannerModel");

const getAllBannerImages = async (req, res) => {
  try {
    let bannerImages = await BannerModel.find({});
    res.status(200).json(bannerImages);
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const getAllProducts = async (req,res) => {
  try{

  }
  catch(err){
    console.log(err);
    errorHandler(err,res);
  }
}


const searchProducts = async (req,res) => {
  try{

  }
  catch(err){
    console.log(err);
    errorHandler(err,res);
  }
}

const getAProduct = async (req,res) => {
  try{

  }
  catch(err){
    console.log(err);
    errorHandler(err,res);
  }
}

module.exports = {
  getAllBannerImages,
  getAllProducts,
  getAProduct,
  searchProducts
};
