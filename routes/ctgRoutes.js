const router = require("express").Router();
const { getAllCtg } = require("../functions/ctgFunctions");

router.get("/categories", getAllCtg);

module.exports = router;
