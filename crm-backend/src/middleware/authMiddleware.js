const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

// Middleware to protect routes (requires valid JWT token)
const protect = async (req, res, next) => {
  let token;

  // Check if the 'Authorization' header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the header (remove 'Bearer ' prefix)
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database using the ID from the token (exclude password)
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true },
      });

      // Proceed to the next middleware or controller
      next();
    } catch (error) {
      // If token verification fails, send a 401 Unauthorized response
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token is found in the header, send a 401 Unauthorized response
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };