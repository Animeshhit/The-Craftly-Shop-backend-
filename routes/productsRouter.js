const express = require("express");
const {
  getAllBannerImages,
  getAllProducts,
  searchProducts,
  getAProduct,
  getProductsBy,
  getDashboard,
  getProductsOfDraft,
} = require("../functions/ProductsFunctions");
const router = express.Router();
const ProductModel = require("../model/productsModel");
const PaginateItems = require("../middalware/paginationForProducts");
const PaginateItemsForHome = require("../middalware/paginationForHome");
const DraftModel = require("../model/DraftsModel");
// This Site The client Operations Will Be Performed

let selectOptions = [
  "name",
  "price",
  "discount",
  "productImage",
  "catagories",
  "isFeatured",
  "isBestSeller",
  "tags",
];

router.get("/banners", getAllBannerImages);
router
  .route("/products")
  .get(PaginateItems(ProductModel, selectOptions), getAllProducts);
router
  .route("/products/by")
  .get(PaginateItemsForHome(ProductModel, selectOptions), getProductsBy);
router.get("/search", searchProducts);
router.get("/product", getAProduct);
router
  .route("/drafts")
  .get(PaginateItems(DraftModel, selectOptions), getProductsOfDraft);
router.get("/dashboard", getDashboard);

// performance optimization
// 1. featured products
// 2. best sellers
// 3. products from similar catagories
// 4. search products
// 5. get single product

module.exports = router;
