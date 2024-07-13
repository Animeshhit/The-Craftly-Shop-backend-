const express = require("express");
const router = express.Router();

const {
  createANewBanner,
  editABannerImage,
  deleteABannerImage,
  changeMainImage,
  createNewProduct,
  editAProduct,
  deleteAProduct,
  createNewProductImage,
  changeProductMainImage,
  changeProductImages,
  getAllUsers,
} = require("../functions/adminFunctions");

// testing the admin pannel

// routes for admin ui
// ## For Image Slider
//  ==> Adding New Banner Image With link
//  ==> Edit A Banner Image
//  ==> Delete A Banner Image
//  ==> Change Main Image
// ==> geting all banner images

router.post("/addnewbanner", createANewBanner);
router.put("/editabannerimage", editABannerImage);
router.delete("/deleteabannerimage", deleteABannerImage);
router.post("/changemainimage", changeMainImage);

// ## For Products

// ==> Add New product
// ==> View A Product Info
// ==> Edit A Product
// ==> Delete A Product

router.post("/createnewproduct", createNewProduct);
router.post("/createproductimage", createNewProductImage);
router.post("/changeproductmainimage", changeProductMainImage);
router.post("/changeproductimages", changeProductImages);
router.put("/editaproduct", editAProduct);
router.delete("/deleteaproduct", deleteAProduct);

//for users
// ==> /users ==> get all users

router.get("/users", getAllUsers);

module.exports = router;
