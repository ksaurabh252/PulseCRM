const express = require("express");
const router = express.Router();

// Import lead controller functions
const {
  getAllLeads,
  createLead,
  getLeadById,
  updateLead,
} = require("../controllers/leadController");

// Import authentication middleware to protect routes
const { protect } = require("../middleware/authMiddleware");

// ==============================
// All routes below are protected
// ==============================

// Route: GET /api/leads/      -> Get all leads
//        POST /api/leads/     -> Create a new lead
router
  .route("/")
  .get(protect, getAllLeads) // Get all leads (protected)
  .post(protect, createLead); // Create new lead (protected)

// Route: GET /api/leads/:id   -> Get a single lead by ID
//        PUT /api/leads/:id   -> Update a lead by ID
router
  .route("/:id")
  .get(protect, getLeadById) // Get single lead (protected)
  .put(protect, updateLead); // Update lead (protected)

module.exports = router;
