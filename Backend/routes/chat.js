const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controller/chatController");
const router = express.Router();

router.post("/", accessChat);
router.get("/", fetchChats);
router.post("/group", createGroupChat);
router.put("/rename", renameGroup);
router.put("/groupRemove", removeFromGroup);
router.put("/groupAdd", addToGroup);

module.exports = router;
