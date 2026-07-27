const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");

// Dashboard Summary
router.get(
    "/dashboard",
    authMiddleware,
    analyticsController.getDashboard
);

// Most Active Friends
router.get(
    "/active-friends",
    authMiddleware,
    analyticsController.getMostActiveFriends
);

// Productivity Score
router.get(
    "/productivity-score",
    authMiddleware,
    analyticsController.getProductivityScore
);

// Event Frequency
router.get(
    "/event-frequency",
    authMiddleware,
    analyticsController.getEventFrequency
);

// Weekly Activity
router.get(
    "/weekly-activity",
    authMiddleware,
    analyticsController.getWeeklyActivity
);

// Monthly Activity
router.get(
    "/monthly-activity",
    authMiddleware,
    analyticsController.getMonthlyActivity
);

// Friend Growth
router.get(
    "/friend-growth",
    authMiddleware,
    analyticsController.getFriendGrowth
);

module.exports = router;