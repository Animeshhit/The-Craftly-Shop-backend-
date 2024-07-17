const express = require("express");
const {
  getAllBannerImages,
  getAllProducts,
  searchProducts,
  getAProduct,
} = require("../functions/ProductsFunctions");
const router = express.Router();

// This Site The client Operations Will Be Performed

router.get("/banners", getAllBannerImages);
router.get("/products", getAllProducts);
router.get("/search", searchProducts);
router.get("/product", getAProduct);

// performance optimization
// 1. featured products
// 2. best sellers
// 3. products from similar catagories
// 4. search products
// 5. get single product

module.exports = router;
