const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
    getNotifications,
    markNotificationsRead,
    getUnreadCount,
} = require("../controllers/notificationController");

router.get("/", auth, getNotifications);
router.patch("/read", auth, markNotificationsRead);
router.get(
    "/unread-count",
    auth,
    getUnreadCount
);

module.exports = router;