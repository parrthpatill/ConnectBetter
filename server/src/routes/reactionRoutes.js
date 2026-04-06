const express = require("express");
const router = express.Router();
const { reactToEvent } = require("../controllers/reactionController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, reactToEvent);

module.exports = router;