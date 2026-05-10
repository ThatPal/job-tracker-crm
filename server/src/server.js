require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");
const jobRoutes = require("./routes/jobRoutes");
const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Tracker CRM API is running.");
});

app.use("/api/health", healthRoutes);
app.use("/api/jobs", jobRoutes);

// These must come after all normal routes.
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});