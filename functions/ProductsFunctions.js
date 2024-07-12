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
    let products = await ProductModel.find({});
    res.status(200).json({status:200,products});
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
    let {id} = req.query;
    if(!id) return res.status(403).json({message:"id is not given"});
    let product = await ProductModel.findOne({_id:id});
    if(!product){
      res.status(404).json({status:404,message:"product not found"});
      return;
    }
    res.status(200).json({status:200,product});
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
