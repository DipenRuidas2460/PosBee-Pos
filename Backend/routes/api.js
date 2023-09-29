const express = require("express");
const router = express.Router();

const { payment, savePayment } = require("../controller/paymentController");
const {
  addCategory,
  updateCategory,
  saveTxn,
  getTxn,
  getPackages,
  getPackagesById,
  ping,
} = require("../controller/apiController");

// payment:--

router.post("/payment", payment);
router.post("/save-payment", savePayment);

// api-controller:--

router.post("/addcategory", addCategory);
router.post("/updatecategory", updateCategory);
router.post("/savetxn", saveTxn);
router.get("/gettxn", getTxn);
router.get("/packages", getPackages);
router.get("/package/:id", getPackagesById);
router.get("/ping", ping);


module.exports = router;
