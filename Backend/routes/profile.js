const express = require("express");
const router = express.Router();

const {
  login,
  getCategory,
  addUser,
  forgetPass,
  fpUpdatePass,
  checkToken,
} = require("../controller/profileController");

router.post("/login", login);
router.post("/register", addUser);
router.post("/forgotpass", forgetPass);
router.post("/resetpass", fpUpdatePass);
router.get("/category", getCategory);
router.get("/checktoken/:token", checkToken);

module.exports = router;
