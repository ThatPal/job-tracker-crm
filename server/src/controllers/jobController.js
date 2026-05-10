const Job = require("../models/jobModel");

// GET /api/jobs
// Supports search, status filter, pagination, and sorting.
// Example: /api/jobs?search=john&status=New&page=1&limit=5&sortBy=createdAt&sortOrder=desc
const getJobs = async (req, res, next) => {
  try {
    const {
      search,
      status,
      page = 1,
      limit = 5,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { propertyAddress: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total: totalJobs,
      page: pageNumber,
      pages: Math.ceil(totalJobs / limitNumber),
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/jobs
const createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job created successfully.",
      data: job,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

// GET /api/jobs/:id
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found.");
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/jobs/:id
const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      res.status(404);
      throw new Error("Job not found.");
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      data: job,
    });
  } catch (error) {
    res.status(res.statusCode === 200 ? 400 : res.statusCode);
    next(error);
  }
};

// DELETE /api/jobs/:id
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found.");
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
};