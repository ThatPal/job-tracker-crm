// Load environment variables from the .env file.
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");

// Create the Express application.
const app = express();

// PORT comes from .env. If not found, use 5000.
const PORT = process.env.PORT || 5000;

// Middleware allows Express to process incoming requests.
app.use(cors());
app.use(express.json());

// Basic root route.
app.get("/", (req, res) => {
  res.send("Job Tracker CRM API is running.");
});

// Health check route.
// Full URL will be: http://localhost:5000/api/health
app.use("/api/health", healthRoutes);

// Start the server.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});