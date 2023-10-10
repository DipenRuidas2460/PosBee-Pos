const express = require("express");
const router = express.Router();

const {
  login,
  addUser,
  forgetPass,
  fpUpdatePass,
  checkToken,
  logOut,
  getLoginStatus
} = require("../controller/profileController");


router.post("/register", addUser);
router.post("/login", login);
router.get("/logout", logOut);
router.get("/loginstatus", getLoginStatus);
router.post("/forgotpass", forgetPass);
router.post("/resetpass", fpUpdatePass);
router.get("/checktoken/:token", checkToken);

module.exports = router;
