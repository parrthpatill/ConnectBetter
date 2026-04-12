const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    sendMessage,
    getMessages,
    getGroupMessages
} = require("../controllers/messageController");

router.post("/", auth, sendMessage);
router.get("/:userId", auth, getMessages);
router.get("/group/:groupId", auth, getGroupMessages);

module.exports = router;