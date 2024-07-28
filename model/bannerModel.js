const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  bannerImage: {
    type: String,
    required: [true, "banner image is required"],
  },
  bannerImageHash: {
    type: String,
    required: [true, "banner image hash is required"],
  },
  phoneBannerImage: {
    type: String,
    required: [true, "image image for phone is required"],
  },
  phoneBannerImageHash: {
    type: String,
    required: [true, "phone banner image hash is required"],
  },
  bannerLink: {
    type: String,
    default: "/",
    required: [true, "banner image link is required"],
    trim: true,
  },
  bannerText: {
    type: String,
    default: null,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isMainImage: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("banner", bannerSchema);
