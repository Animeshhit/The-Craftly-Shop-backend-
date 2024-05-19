const errorHandler = require("./ErrorHandler");
const BannerModel = require("../model/adminModels/bannerModel");

const createANewBanner = async (req, res) => {
  // for creating a banner image user will provide
  // a image link and a link of page
  // i have to just create  a banner in banner model
  // that's it.
  // and they are all ready verified so i have no issues

  try {
    let { bannerImage, bannerLink } = req.body;
    if (!(bannerImage && bannerLink)) {
      res
        .status(401)
        .json({ message: "please provide all the required information" });
      return;
    }
    let newBanner = new BannerModel({
      bannerImage,
      bannerLink,
    });

    let savedBanner = await newBanner.save();

    res.status(201).json({ message: "banner added!!", banner: savedBanner });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const editABannerImage = async (req, res) => {
  // getting required information from user to edit
  // 1. banner Id
  // 2. updated information for updatation
  // done
  try {
    let { bannerId } = req.query;
    let { bannerImage, bannerLink } = req.body;
    if (!bannerId) {
      res.status(404).json({ message: "please provide all the information" });
      return;
    }
    let updatedBanner = await BannerModel.findByIdAndUpdate(
      bannerId,
      {
        bannerImage,
        bannerLink,
      },
      { new: true }
    );
    console.log(updatedBanner);
    if (!updatedBanner) {
      res.status(404).json({ message: "banner not found" });
      return;
    }
    res.status(200).json({ message: "banner updated", banner: updatedBanner });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const deleteABannerImage = async (req, res) => {
  // getting the banner id
  // searching for the banner if it exists or not
  // then deleting the banner
  try {
    let { bannerId } = req.query;
    if (!bannerId) {
      res.status(403).json({ message: "bad request" });
      return;
    }
    let bannerToDelete = await BannerModel.findByIdAndDelete(bannerId);
    if (!bannerToDelete) {
      res.status(404).json({ message: "banner not found" });
      return;
    }
    res.status(200).json({ message: "banner deleted!!" });
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const changeMainImage = async (req, res) => {
  // seraching the current the banner image
  // ===> banner image not exist ===> set the new
  // ===> banner iamge exist ==> set that false and then set new new one true and old one false

  try {
    const { bannerId } = req.query;

    try {
      if (!bannerId) {
        throw new Error("Please provide all the information.");
      }

      // Unset the current main banner image
      const mainBannerImage = await BannerModel.findOneAndUpdate(
        { isMainImage: true },
        { $set: { isMainImage: false } }
      );

      // Set the new main banner image
      const bannerToSetMain = await BannerModel.findByIdAndUpdate(
        bannerId,
        { isMainImage: true },
        { new: true }
      );

      if (!bannerToSetMain) {
        res.status(404).json({ message: "Banner image not found." });
        return;
      }

      res.status(200).json({
        message: "Banner is now the main image.",
        banner: bannerToSetMain,
      });
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: error.message });
    }
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const createNewProduct = (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const getAProduct = (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};
const editAProduct = (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};

const deleteAProduct = (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
};
module.exports = {
  createANewBanner,
  editABannerImage,
  deleteABannerImage,
  changeMainImage,
  createNewProduct,
  getAProduct,
  editAProduct,
  deleteAProduct,
};
