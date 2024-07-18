const express = require("express");
const router = express.Router();

const productValidateSchema = require("../validatorSchemas/productSchema");
const productValidate = require("../validators/productValidator");

const {
  // createANewBanner,
  // editABannerImage,
  // deleteABannerImage,
  // changeMainImage,
  createNewProduct,
  // editAProduct,
  // deleteAProduct,
  // createNewProductImage,
  // changeProductMainImage,
  // changeProductImages,
  getAllUsers,
  createNewCtg,
  deleteCtg,
} = require("../functions/adminFunctions");

// testing the admin pannel

// routes for admin ui
// ## For Image Slider
//  ==> Adding New Banner Image With link
//  ==> Edit A Banner Image
//  ==> Delete A Banner Image
//  ==> Change Main Image
// ==> geting all banner images

// router.post("/addnewbanner", createANewBanner);
// router.put("/editabannerimage", editABannerImage);
// router.delete("/deleteabannerimage", deleteABannerImage);
// router.post("/changemainimage", changeMainImage);

// ## For Products

// ==> Add New product
// ==> View A Product Info
// ==> Edit A Product
// ==> Delete A Product

router.post(
  "/createnewproduct",
  productValidate(productValidateSchema),
  createNewProduct
);
// router.post("/createproductimage", createNewProductImage);
// router.post("/changeproductmainimage", changeProductMainImage);
// router.post("/changeproductimages", changeProductImages);
// router.put("/editaproduct", editAProduct);
// router.delete("/deleteaproduct", deleteAProduct);

//for users
// ==> /users ==> get all users

router.get("/users", getAllUsers);

// For categories
// ===> /create-new-ctg
// ====> /delete-ctg

router.post("/create-new-ctg", createNewCtg);
router.delete("/delete-ctg", deleteCtg);

module.exports = router;
