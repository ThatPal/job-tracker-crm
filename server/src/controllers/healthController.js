// This controller handles the health check route.
// A health route is a simple test endpoint that confirms the server is running.

const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running successfully.",
  });
};

module.exports = {
  getHealthStatus,
};