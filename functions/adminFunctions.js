const errorHandler = require("./ErrorHandler");
const BannerModel = require("../model/bannerModel");
const ProductModel = require("../model/productsModel");
const UserModel = require("../model/userModel");
const { v4 } = require("uuid");
const CtgModel = require("../model/ctgModel");

// For Banners============================================================

// const createANewBanner = async (req, res) => {
//   // for creating a banner image user will provide
//   // a image link and a link of page
//   // i have to just create  a banner in banner model
//   // that's it.
//   // and they are all ready verified so i have no issues

//   try {
//     let { bannerText, bannerImage, bannerLink } = req.body;

//     console.log(bannerImage);

//     if (!bannerImage || bannerImage == "" || bannerImage == undefined) {
//       return res
//         .status(401)
//         .json({ message: "Please provide all the required information" });
//     }

//     let newBanner = new BannerModel({
//       bannerImage,
//       bannerLink,
//       bannerText,
//     });

//     let savedBanner = await newBanner.save();

//     res.status(201).json({ message: "banner added!!", banner: savedBanner });
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

// const editABannerImage = async (req, res) => {
//   // getting required information from user to edit
//   // 1. banner Id
//   // 2. updated information for updatation
//   // done
//   try {
//     let { bannerId } = req.query;
//     let { bannerImage, bannerLink, bannerText } = req.body;
//     if (!bannerId) {
//       res.status(404).json({ message: "please provide all the information" });
//       return;
//     }
//     let updatedBanner = await BannerModel.findByIdAndUpdate(
//       bannerId,
//       {
//         bannerImage,
//         bannerLink,
//         bannerText,
//       },
//       { new: true }
//     );
//     console.log(updatedBanner);
//     if (!updatedBanner) {
//       res.status(404).json({ message: "banner not found" });
//       return;
//     }
//     res.status(200).json({ message: "banner updated", banner: updatedBanner });
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

// const deleteABannerImage = async (req, res) => {
//   // getting the banner id
//   // searching for the banner if it exists or not
//   // then deleting the banner
//   try {
//     let { bannerId } = req.query;
//     if (!bannerId) {
//       res.status(403).json({ message: "bad request" });
//       return;
//     }
//     let bannerToDelete = await BannerModel.findByIdAndDelete(bannerId);
//     if (!bannerToDelete) {
//       res.status(404).json({ message: "banner not found" });
//       return;
//     }
//     res.status(200).json({ message: "banner deleted!!" });
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

// const changeMainImage = async (req, res) => {
//   // seraching the current the banner image
//   // ===> banner image not exist ===> set the new
//   // ===> banner iamge exist ==> set that false and then set new new one true and old one false

//   try {
//     const { bannerId } = req.query;

//     try {
//       if (!bannerId) {
//         throw new Error("Please provide all the information.");
//       }

//       // Unset the current main banner image
//       const mainBannerImage = await BannerModel.findOneAndUpdate(
//         { isMainImage: true },
//         { $set: { isMainImage: false } }
//       );

//       // Set the new main banner image
//       const bannerToSetMain = await BannerModel.findByIdAndUpdate(
//         bannerId,
//         { isMainImage: true },
//         { new: true }
//       );

//       if (!bannerToSetMain) {
//         res.status(404).json({ message: "Banner image not found." });
//         return;
//       }

//       res.status(200).json({
//         message: "Banner is now the main image.",
//         banner: bannerToSetMain,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(403).json({ message: error.message });
//     }
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

// For Products Pages======================================================
const createNewProduct = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      discount,
      productImage,
      productImages,
      catagories,
      productUniqueId,
      stock,
      isFeatured,
      isBestSeller,
    } = req.body;

    let existingProduct = await ProductModel.findOne({ productUniqueId });

    if (existingProduct) {
      res
        .status(403)
        .json({ status: 403, message: "unique id is already exist!!" });
      return;
    }

    const newProduct = new ProductModel({
      name,
      description,
      price,
      discount,
      productImage,
      productImages,
      catagories,
      productUniqueId,
      stock,
      isFeatured,
      isBestSeller,
    });
    const createdProduct = await newProduct.save();

    res
      .status(201)
      .json({ status: 201, message: "product Added", product: createdProduct });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

// const createNewProductImage = async (req, res) => {
//   try {
//     let { productImage } = req.body;
//     let { productId } = req.query;
//     const product = await ProductModel.findOne({ _id: productId });
//     if (!product) {
//       return res
//         .status(404)
//         .json({ status: 404, message: "product not found" });
//     }
//     let newProductImage = {
//       id: v4(),
//       image: productImage,
//     };
//     product.productImages.push(newProductImage);
//     let updatedProduct = await product.save();
//     res.status(201).json({
//       status: 201,
//       message: "product image added",
//       product: updatedProduct,
//     });
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

// const editAProduct = async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

// const deleteAProduct = async (req, res) => {
//   try {
//     let { id } = req.query;
//     let isDeleted = await ProductModel.findByIdAndDelete(id);
//     if (isDeleted) {
//       return res.status(200).json({ status: 200, message: "Product Deleted" });
//     }
//     return res.status(404).json({ status: 404, message: "Product Not Found" });
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

// const changeProductMainImage = async (req, res) => {
//   try {
//     let { productImage } = req.body;
//     let { productId } = req.query;
//     const product = await ProductModel.findOne({ _id: productId });
//     if (!product) {
//       return res
//         .status(404)
//         .json({ status: 404, message: "Product Not Found" });
//     }
//     product.productImage = productImage;
//     let updatedProduct = await product.save();
//     res.status(201).json({
//       status: 201,
//       message: "product image updated",
//       product: updatedProduct,
//     });
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

// const changeProductImages = async (req, res) => {
//   try {
//     let { productImage, id } = req.body;
//     let { productId } = req.query;
//     const updatedProduct = await ProductModel.findOneAndUpdate(
//       { _id: productId, "productImages.id": id },
//       { $set: { "productImages.$.image": productImage } },
//       { new: true } // Return the modified document
//     );
//     if (!updatedProduct) {
//       res.status(404).json({ status: 404, message: "product image not found" });
//       return;
//     }
//     console.log(updatedProduct);
//     res.status(201).json({
//       status: 201,
//       message: "product image updated",
//       product: updatedProduct,
//     });
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

// for users======================================================================

// const getAllUsers = async (req, res) => {
//   try {
//     let users = await UserModel.find({});
//     res.status(200).json(users);
//   } catch (err) {
//     console.log(err);
//     errorHandler(err, res);
//   }
// };

//For Categories
const createNewCtg = async (req, res) => {
  try {
    let { name } = req.body;
    if ((name == "") | !name) {
      return res.status(403).json({ message: "please enter a valid name" });
    }
    let ctg = await CtgModel.findOne({ name: new RegExp(`^${name}$`, "i") });

    if (ctg) {
      return res.status(401).json({ message: "categories is already added" });
    }
    console.log(ctg);
    let newCtg = new CtgModel({
      name: name.trim(),
    });
    let savedCtg = await newCtg.save();
    res.status(201).json({ message: "categories added", newctg: savedCtg });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const deleteCtg = async (req, res) => {
  try {
    let { id } = req.query;
    if (!id) {
      return res.status(403).json({ message: "bad request" });
    }
    let ctg = await CtgModel.findByIdAndDelete(id);
    if (ctg) {
      res.status(200).json({ message: "categories removed" });
    } else {
      res.status(404).json({ message: "bad request" });
    }
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

module.exports = {
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
  // getAllUsers,
  createNewCtg,
  deleteCtg,
};
