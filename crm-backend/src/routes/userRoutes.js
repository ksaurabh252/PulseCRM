// src/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  resetUserPassword,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleCheck");

// Role constants for easy reference
const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
};

// ===============================================
// @route   GET /api/users
// @desc    Get all users (Only Admin and Manager)
// @access  Private
// ===============================================
router.route("/").get(
  protect, // Middleware to check if user is authenticated
  checkRole([ROLES.ADMIN, ROLES.MANAGER]), // Middleware to check if user is Admin or Manager
  getAllUsers // Controller to handle the request
);

// ===============================================================
// @route   POST /api/users/:id/reset-password
// @desc    Reset a user's password (Only Admin and Manager)
// @access  Private
// ===============================================================
router.route("/:id/reset-password").post(
  protect, // Middleware to check if user is authenticated
  checkRole([ROLES.ADMIN, ROLES.MANAGER]), // Middleware to check if user is Admin or Manager
  resetUserPassword // Controller to handle the request
);

module.exports = router;
