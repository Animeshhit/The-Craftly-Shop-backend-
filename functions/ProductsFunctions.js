const ProductModel = require("../model/productsModel");
const errorHandler = require("./ErrorHandler");

const getAllProducts = async (req, res) => {
  try {
    let products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const getAProduct = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const getProductsFromACategories = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const createProduct = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const updateAProduct = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const updateAProductStock = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

module.exports = {
  getAllProducts,
  getAProduct,
  getProductsFromACategories,
  createProduct,
  deleteProduct,
  updateAProduct,
  updateAProductStock,
};
