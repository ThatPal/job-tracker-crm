// Axios is used to send HTTP requests from React to our backend API.
import axios from "axios";

// Base URL of our Express backend.
const API_URL = "http://localhost:5000/api/jobs";

// Get all jobs from the backend.
export const getJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new job in the backend.
export const createJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData);
  return response.data;
};