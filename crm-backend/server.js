// ===========================
// Required External Modules
// ===========================

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io"); // Socket.IO for real-time communication

// ===========================
// Routes Import
// ===========================

// Import route modules – each file handles a specific set of related endpoints
const authRoutes = require("./src/routes/authRoutes"); // Authentication routes (login, register, etc.)
const leadRoutes = require("./src/routes/leadRoutes"); // Lead management routes
const activityRoutes = require("./src/routes/activityRoutes"); // Activity tracking routes

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

// Create HTTP server from Express app (required for Socket.IO)
const server = http.createServer(app);

// ===========================
// Middleware Setup
// ===========================

// Configure CORS to allow requests from frontend domains
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174", // backup local port
    "https://pulse-crm-tau.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Initialize Socket.IO with CORS configuration
const io = new Server(server, { cors: corsOptions });

// Attach Socket.IO instance to all requests for easy access in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.IO connection handler for real-time events
io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Enable built-in Express middleware to parse JSON request bodies
// This allows us to use req.body directly when handling JSON data
app.use(express.json());

// ===========================
// Routes Registration
// ===========================

// Link each group of route handlers to a specific URL prefix
app.use("/api/auth", authRoutes); // All auth-related routes start with /api/auth
app.use("/api/leads", leadRoutes); // All lead-related routes start with /api/leads
app.use("/api/activities", activityRoutes); // All activity-related routes start with /api/activities

app.use("/api/users", userRoutes);

// ===========================
// Health Check / Root Route
// ===========================

// A simple root route to verify that the API is up and running
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Next-Gen CRM API", status: "running" });
});

// Health check endpoint for monitoring and deployment services
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// ===========================
// Server Initialization
// ===========================

// Get the port number from environment variables, or use 5001 as the default
const PORT = process.env.PORT || 5001;

// Start the HTTP server (with Socket.IO attached) and log confirmation
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
