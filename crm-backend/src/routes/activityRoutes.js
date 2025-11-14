const express = require("express");
const router = express.Router();

const {
  getActivitiesForLead,
  createActivity,
} = require("../controllers/activityController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createActivity);

router.route("/:leadId").get(protect, getActivitiesForLead);

module.exports = router;
