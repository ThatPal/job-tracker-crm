import { useEffect, useState } from "react";

import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import { createJob, getJobs } from "./services/jobService";

// App.jsx is the main React component.
// It loads jobs from the backend and passes data into child components.

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Loads jobs from the backend API.
  const loadJobs = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const result = await getJobs();

      setJobs(result.data);
    } catch (error) {
      setErrorMessage("Could not load jobs from the server.");
    } finally {
      setLoading(false);
    }
  };

  // Runs once when the app first opens.
  useEffect(() => {
    loadJobs();
  }, []);

  // Creates a new job and refreshes the job list.
  const handleCreateJob = async (jobData) => {
    try {
      setErrorMessage("");

      await createJob(jobData);
      await loadJobs();
    } catch (error) {
      setErrorMessage("Could not create job. Please check the form.");
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

          {loading && <p>Loading jobs...</p>}

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {!loading && <JobList jobs={jobs} />}
        </section>

        <section className="card">
          <h2>Add New Job</h2>
          <JobForm onCreateJob={handleCreateJob} />
        </section>
      </main>
    </div>
  );
}

export default App;