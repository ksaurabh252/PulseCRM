const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
  errorFormat: "pretty",
});

// Test connection
prisma
  .$connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = prisma;
