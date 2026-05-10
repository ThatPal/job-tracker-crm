// Load environment variables from .env.
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");
const jobRoutes = require("./routes/jobRoutes");

// Connect to MongoDB before starting the API routes.
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("Job Tracker CRM API is running.");
});

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});