// Middleware to check if the user has one of the allowed roles
const checkRole = (roles) => {
  // Returns an Express middleware function
  return (req, res, next) => {
    // ===========================
    // Role Authorization Check
    // ===========================

    // Check if user is logged in and has a role included in the allowed roles array
    if (!req.user || !roles.includes(req.user.role)) {
      // If not authorized, send a 403 Forbidden response with a message
      return res.status(403).json({
        message: "Forbidden: You do not have permission for this action.",
      });
    }

    // If authorized, proceed to the next middleware or route handler
    next();
  };
};

module.exports = checkRole;
