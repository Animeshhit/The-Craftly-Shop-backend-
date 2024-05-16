const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAProduct,
  getProductsFromACategories,
  createProduct,
  deleteProduct,
  updateAProduct,
  updateAProductStock,
} = require("../functions/ProductsFunctions");

// /products  : for getting all products from the data
// /product : for getting a specific product
// /products/:catagories : for a specific catagories products
// /createProduct :for adding a new product
// /removeProduct :for removing a product from the list
// /updateProduct : for updating product details
// /updateProductStock : for updating product stock and out of stock FileSystem

router.get("/products", getAllProducts);
router.get("/product", getAProduct);
router.get("/products/categories", getProductsFromACategories);
router.post("/product", createProduct);
router.delete("/product", deleteProduct);
router.put("/product", updateAProduct);
router.put("/product/stock", updateAProductStock);

module.exports = router;
