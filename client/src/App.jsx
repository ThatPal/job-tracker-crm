import { useEffect, useState } from "react";

import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "./services/jobService";

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadJobs = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const result = await getJobs({
        search: searchText,
        status: statusFilter,
      });

      setJobs(result.data);
    } catch (error) {
      setErrorMessage("Could not load jobs from the server.");
    } finally {
      setLoading(false);
    }
  };

  // Reload jobs whenever search or status changes.
  useEffect(() => {
    loadJobs();
  }, [searchText, statusFilter]);

  const handleCreateJob = async (jobData) => {
    try {
      setErrorMessage("");

      await createJob(jobData);
      await loadJobs();
    } catch (error) {
      setErrorMessage("Could not create job. Please check the form.");
    }
  };

  const handleUpdateJob = async (jobId, jobData) => {
    try {
      setErrorMessage("");

      await updateJob(jobId, jobData);
      setSelectedJob(null);
      await loadJobs();
    } catch (error) {
      setErrorMessage("Could not update job.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");

    if (!confirmed) return;

    try {
      setErrorMessage("");

      await deleteJob(jobId);
      await loadJobs();
    } catch (error) {
      setErrorMessage("Could not delete job.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Job Tracker CRM</h1>
        <p>Track customers, properties, and job progress.</p>
      </header>

      <main className="main-content">
        <section className="card">
          <h2>Jobs</h2>

          <div className="filters-row">
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by name, address, phone, or email"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All</option>
              <option>New</option>
              <option>Measured</option>
              <option>Designed</option>
              <option>Estimated</option>
              <option>Approved</option>
              <option>Ordered</option>
              <option>Delivered</option>
              <option>Closed</option>
            </select>
          </div>

          <p className="result-count">Showing {jobs.length} jobs</p>

          {loading && <p>Loading jobs...</p>}

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {!loading && (
            <JobList
              jobs={jobs}
              onEditJob={setSelectedJob}
              onDeleteJob={handleDeleteJob}
            />
          )}
        </section>

        <section className="card">
          <h2>{selectedJob ? "Edit Job" : "Add New Job"}</h2>

          <JobForm
            onCreateJob={handleCreateJob}
            onUpdateJob={handleUpdateJob}
            selectedJob={selectedJob}
            onCancelEdit={() => setSelectedJob(null)}
          />
        </section>
      </main>
    </div>
  );
}

export default App;