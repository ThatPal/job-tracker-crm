const express = require("express");

const {
  getJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

// /api/jobs
router.route("/").get(getJobs).post(createJob);

// /api/jobs/:id
router.route("/:id").get(getJobById).put(updateJob).delete(deleteJob);

module.exports = router;