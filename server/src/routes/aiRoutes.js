const express = require("express");
const router = express.Router();
const { processEvent } = require("../controllers/aiController");
const auth = require("../middleware/authMiddleware");

router.post("/extract", auth, processEvent);

module.exports = router;