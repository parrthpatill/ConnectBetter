const express = require("express");
const router = express.Router();
const { createGroup, getMyGroups } = require("../controllers/groupController");
const auth = require("../middleware/authMiddleware");

router.post("/create", auth, createGroup);
router.get("/", auth, getMyGroups);

module.exports = router;