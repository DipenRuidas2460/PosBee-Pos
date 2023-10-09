const express = require("express");
const router = express.Router();

const {
  addCategory,
  updateCategory,
} = require("../controller/apiController");


// api-controller:--

router.post("/addcategory", addCategory);
router.post("/updatecategory", updateCategory);

module.exports = router;
