const express = require("express");
const router = express.Router();

// Import controller functions for activities
const {
  getActivitiesForLead,
  createActivity,
} = require("../controllers/activityController");

// Import authentication middleware to protect routes
const { protect } = require("../middleware/authMiddleware");

// Route to create a new activity (POST /api/activities)
//Only authenticated users can create activities
router.route("/").post(protect, createActivity);

// Route to get all activities for a specific lead (GET /api/activities/:leadId)
//Only authenticated users can view activities
router.route("/:leadId").get(protect, getActivitiesForLead);

// Export the router to be used in the main app
module.exports = router;
