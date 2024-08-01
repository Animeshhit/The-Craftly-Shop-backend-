const express = require("express");
const router = express.Router();

const productValidateSchema = require("../validatorSchemas/productSchema");
const productValidate = require("../validators/productValidator");
const bannerDataValidator = require("../validators/bannerValidator");
const bannerValidatorSchema = require("../validatorSchemas/bannerSchema");
const PaginateItems = require("../middalware/paginationForProducts");
const UserModel = require("../model/userModel");

const {
  createANewBanner,
  // editABannerImage,
  deleteABannerImage,
  changeMainImage,
  createNewProduct,
  editAProduct,
  deleteAProduct,
  createNewProductAtDraft,
  moveToDraft,
  moveToProduct,
  // createNewProductImage,
  // changeProductMainImage,
  // changeProductImages,
  getAllUsers,
  createNewCtg,
  deleteCtg,
  changeAdminStatus,
  deleteADraftProduct,
} = require("../functions/adminFunctions");

// testing the admin pannel

// routes for admin ui
// ## For Image Slider
//  ==> Adding New Banner Image With link
//  ==> Edit A Banner Image
//  ==> Delete A Banner Image
//  ==> Change Main Image
// ==> geting all banner images

router.post(
  "/addnewbanner",
  bannerDataValidator(bannerValidatorSchema),
  createANewBanner
);
// router.put("/editabannerimage", editABannerImage);
router.delete("/deleteabannerimage", deleteABannerImage);
router.post("/changemainimage", changeMainImage);

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

router.post(
  "/createnewproductatdraft",
  productValidate(productValidateSchema),
  createNewProductAtDraft
);
// router.post("/createproductimage", createNewProductImage);
// router.post("/changeproductmainimage", changeProductMainImage);
// router.post("/changeproductimages", changeProductImages);
router.post("/editaproduct", editAProduct);
router.delete("/deleteaproduct", deleteAProduct);
router.delete("/deleteadraftproduct", deleteADraftProduct);

//for users
// ==> /users ==> get all users
// ==> /changeadmin ==> change the user admin

router
  .route("/users")
  .get(
    PaginateItems(UserModel, "-password -cart -orders -notifications"),
    getAllUsers
  );
router.get("/changeadmin", changeAdminStatus);

// For categories
// ===> /create-new-ctg
// ====> /delete-ctg

router.post("/create-new-ctg", createNewCtg);
router.delete("/delete-ctg", deleteCtg);
router.post("/movetodraft", moveToDraft);
router.post("/movetopublic", moveToProduct);

module.exports = router;
