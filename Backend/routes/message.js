const express = require("express");
const { allMessages, sendMessage } = require("../controller/messageController");
const router = express.Router();

router.post("/", sendMessage);
router.get("/:chatId", allMessages);

module.exports = router;
