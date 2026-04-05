const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    createEvent,
    getEvents,
    deleteEvent
} = require("../controllers/eventController");

// CREATE EVENT
router.post("/", auth, createEvent);

// GET FEED
router.get("/", auth, getEvents);

// DELETE EVENT
router.delete("/:id", auth, deleteEvent);

module.exports = router;