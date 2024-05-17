const express = require("express");
const router = express.Router();

const {
  createANewBanner,
  editABannerImage,
  deleteABannerImage,
  changeMainImage,
  createNewProduct,
  getAProduct,
  editAProduct,
  deleteAProduct,
} = require("../functions/adminFunctions");

// testing the admin pannel

router.get("/", (req, res) => {
  res.status(200).json({ message: "working!!", user: req.user });
});

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
router.get("/product", getAProduct);
router.put("/editaproduct", editAProduct);
router.delete("/deleteaproduct", deleteAProduct);

module.exports = router;
