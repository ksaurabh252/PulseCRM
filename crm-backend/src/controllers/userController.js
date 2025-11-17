const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // For generating temporary passwords

// ===============================
// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin/Manager)
// ===============================
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database, selecting only specific fields
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Send the list of users as a JSON response
    res.status(200).json(users);
  } catch (error) {
    // Log and handle any errors
    console.error("--- GET ALL USERS ERROR ---", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===========================================
// @desc    Reset a user's password
// @route   POST /api/users/:id/reset-password
// @access  Private (Admin/Manager)
// ===========================================
exports.resetUserPassword = async (req, res) => {
  try {
    // Extract user ID from the URL parameters and convert to integer
    const { id } = req.params;
    const userId = parseInt(id);

    // 1. Generate a new temporary password (12 hex characters)
    const newTempPassword = crypto.randomBytes(6).toString("hex"); // e.g., "a1b2c3d4e5f6"

    // 2. Hash the new password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newTempPassword, salt);

    // 3. Update the user's password in the database with the hashed password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    // Log the password reset action for auditing
    console.log(
      `Password reset for user ${userId} by Admin ${req.user.name}. New temp pass: ${newTempPassword}`
    );

    // 4. Send the new temporary password back to the admin in the response
    res.status(200).json({
      message: "User password reset successfully",
      temporaryPassword: newTempPassword, // So the admin can share it with the user
    });
  } catch (error) {
    // Log and handle any errors
    console.error("--- RESET PASSWORD ERROR ---", error);
    res.status(500).json({ message: "Server Error" });
  }
};
