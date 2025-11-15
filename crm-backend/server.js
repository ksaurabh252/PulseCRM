// ===========================
// Required External Modules
// ===========================

const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

// ===========================
// Environment Configuration
// ===========================

// Load variables from the .env file into process.env
dotenv.config();

// ===========================
// App Initialization
// ===========================

// Create an instance of the Express app (the core of our server)
const app = express();

// ===========================
// Middleware Setup
// ===========================

// Enable CORS for all incoming requests (so your frontend can communicate with the API)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174", // backup local port
      "https://pulse-crm-tau.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Enable built-in Express middleware to parse JSON request bodies
// This allows us to use req.body directly when handling JSON data
app.use(express.json());

// ===========================
// Routes Import
// ===========================

// Import route modules – each file handles a specific set of related endpoints
const authRoutes = require("./src/routes/authRoutes"); // Authentication routes (login, register, etc.)
const leadRoutes = require("./src/routes/leadRoutes"); // Lead management routes
const activityRoutes = require("./src/routes/activityRoutes"); // Activity tracking routes

// ===========================
// Routes Registration
// ===========================

// Link each group of route handlers to a specific URL prefix
app.use("/api/auth", authRoutes); // All auth-related routes start with /api/auth
app.use("/api/leads", leadRoutes); // All lead-related routes start with /api/leads
app.use("/api/activities", activityRoutes); // All activity-related routes start with /api/activities

// ===========================
// Health Check / Root Route
// ===========================

// A simple root route to verify that the API is up and running
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Next-Gen CRM API", status: "running" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// ===========================
// Server Initialization
// ===========================

// Get the port number from environment variables, or use 5001 as the default
const PORT = process.env.PORT || 5001;

// Start the server and log a nice message in the console
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
