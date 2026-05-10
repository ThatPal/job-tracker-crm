import { JOB_STATUSES } from "./constants/jobConstants";

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

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const loadJobs = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const result = await getJobs({
        search: searchText,
        status: statusFilter,
        page,
        limit: 5,
        sortBy,
        sortOrder,
      });

      setJobs(result.data);
      setPages(result.pages);
      setTotalJobs(result.total);
    } catch (error) {
      setErrorMessage("Could not load jobs from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [searchText, statusFilter, page, sortBy, sortOrder]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const handleCreateJob = async (jobData) => {
    try {
      setErrorMessage("");

      await createJob(jobData);
      setPage(1);
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

  const goToPreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const goToNextPage = () => {
    setPage((currentPage) => Math.min(currentPage + 1, pages));
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
              onChange={handleSearchChange}
              placeholder="Search by name, address, phone, or email"
            />

            <select value={statusFilter} onChange={handleStatusChange}>
              <option>All</option>
              {JOB_STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="filters-row">
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setPage(1);
              }}
            >
              <option value="createdAt">Created Date</option>
              <option value="customerName">Customer Name</option>
              <option value="status">Status</option>
              <option value="propertyAddress">Property Address</option>
            </select>

            <select
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value);
                setPage(1);
              }}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          <p className="result-count">
            Showing {jobs.length} of {totalJobs} jobs
          </p>

          {loading && <p>Loading jobs...</p>}

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {!loading && (
            <>
              <JobList
                jobs={jobs}
                onEditJob={setSelectedJob}
                onDeleteJob={handleDeleteJob}
              />

              <div className="pagination-row">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={goToPreviousPage}
                  disabled={page === 1}
                >
                  Previous
                </button>

                <span>
                  Page {page} of {pages}
                </span>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={goToNextPage}
                  disabled={page === pages}
                >
                  Next
                </button>
              </div>
            </>
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