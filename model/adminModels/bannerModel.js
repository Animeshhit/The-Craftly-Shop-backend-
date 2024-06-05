const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  bannerImage: {
    type: String,
    required: true,
  },
  bannerLink: {
    type: String,
    default:"/",
  },
  bannerText:{
    type:String,
    default:null,
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
