const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function: Generate a JWT token for authentication
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token will expire in 30 days
  });
};

// 1. Register a new user
exports.registerUser = async (req, res) => {
  try {
    // Extract user details from the request body
    const { email, password, name, role } = req.body;

    // Check if a user with the same email already exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      // If user exists, return an error
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash (encrypt) the user's password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role, // This can be 'ADMIN', 'MANAGER', or 'SALES_EXECUTIVE'
      },
    });

    // Respond with the new user's details and a JWT token
    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. Login (authenticate) a user
exports.loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // If user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      // Respond with user details and a JWT token
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      // If user not found or password is incorrect
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
