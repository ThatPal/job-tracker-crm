// Express Router lets us keep route definitions separate from the main server file.

const express = require("express");
const { getHealthStatus } = require("../controllers/healthController");

const router = express.Router();

// GET /api/health
// This route checks whether the backend is running.
router.get("/", getHealthStatus);

module.exports = router;