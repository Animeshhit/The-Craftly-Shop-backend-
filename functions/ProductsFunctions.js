const ProductModel = require("../model/productsModel");
const errorHandler = require("./ErrorHandler");
const BannerModel = require("../model/bannerModel");
const userModel = require("../model/userModel");
const ctgModel = require("../model/ctgModel");

const getAllBannerImages = async (req, res) => {
  try {
    let bannerImages = await BannerModel.find({});
    res.status(200).json(bannerImages);
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

//=========================select options for products------------------------
let selectOptions = [
  "name",
  "price",
  "discount",
  "productImage",
  "catagories",
  "isFeatured",
  "isBestSeller",
];

const getAllProducts = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      products: res.paginatedResults.results,
      next: res.paginatedResults.next,
      prev: res.paginatedResults.prev,
      totalProducts: res.paginatedResults.totalProducts,
    });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const searchProducts = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const getProductsBy = async (req, res) => {
  try {
    let { query } = req.query;
    let products;
    if (query == "featured") {
      products = await ProductModel.find({ isFeatured: true }).select(
        selectOptions
      );
    } else if (query == "bestseller") {
      products = await ProductModel.find({ isBestSeller: true }).select(
        selectOptions
      );
    } else {
      return res.status(403).json({ message: "bad request" });
    }

    res.status(200).json({ status: 200, products });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const getAProduct = async (req, res) => {
  try {
    let { id } = req.query;
    if (!id) return res.status(403).json({ message: "bad request" });
    let product = await ProductModel.findOne({ _id: id });
    if (!product) {
      res.status(404).json({ status: 404, message: "product not found" });
      return;
    }
    res.status(200).json({ status: 200, product });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const getDashboard = async (req, res) => {
  try {
    let users = await userModel.countDocuments().exec();
    let banners = await BannerModel.countDocuments().exec();
    let products = await ProductModel.countDocuments().exec();
    let catagories = await ctgModel.countDocuments().exec();

    res.status(200).json({
      users,
      banners,
      products,
      catagories,
    });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

module.exports = {
  getAllBannerImages,
  getAllProducts,
  getAProduct,
  searchProducts,
  getProductsBy,
  getDashboard,
};
