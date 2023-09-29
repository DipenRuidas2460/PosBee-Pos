const express = require("express");
const router = express.Router();

const { updateUser, getUsers } = require("../controller/userController");

router.post("/update", updateUser);
router.get("/user", getUsers);

module.exports = router;
