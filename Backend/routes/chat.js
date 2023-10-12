const express = require("express");
const {
  accessChat,
  fetchChats,
} = require("../controller/chatController");
const router = express.Router();

router.post("/", accessChat);
router.get("/", fetchChats);

module.exports = router;
