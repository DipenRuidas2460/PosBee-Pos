const express = require("express");
const router = express.Router();

const {
  updateUser,
  getUserById,
  updatePassword,
  getAllUsers,
} = require("../controller/userController");

router.put("/update", updateUser);
router.patch("/updatePassword", updatePassword);
router.get("/getUserById", getUserById);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
