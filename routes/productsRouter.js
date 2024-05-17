const express = require("express");
const { getAllBannerImages } = require("../functions/ProductsFunctions");
const router = express.Router();

// This Site The client Operations Will Be Performed

router.get("/banners", getAllBannerImages);

module.exports = router;
