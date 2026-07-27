const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  processEvent,
  suggestFriends,
  prepTips,
  schedulePlan
} = require("../controllers/aiController");

router.post("/extract", auth, processEvent);
router.post("/suggest-friends/:eventId", auth, suggestFriends);
router.post("/prep-tips/:eventId", auth, prepTips);
router.post("/schedule/:eventId", auth, schedulePlan);

module.exports = router;