const express = require("express");
const router = express.Router();

const {
  updateUser,
  getUserById,
  updatePassword,
} = require("../controller/userController");

router.put("/update", updateUser);
router.patch("/updatePassword", updatePassword);
router.get("/getUserById", getUserById);

module.exports = router;
