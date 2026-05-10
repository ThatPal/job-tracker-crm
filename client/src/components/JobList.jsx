function JobList({ jobs, onEditJob, onDeleteJob }) {
  if (jobs.length === 0) {
    return <p>No jobs found yet.</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div className="job-item" key={job._id}>
          <div>
            <h3>{job.customerName}</h3>
            <p>{job.propertyAddress}</p>
            <p>{job.phone}</p>
            <p>{job.email}</p>
            <p>{job.notes}</p>
          </div>

          <div className="job-actions">
            <span className="status-badge">{job.status}</span>

            <button
              type="button"
              className="secondary-button"
              onClick={() => onEditJob(job)}
            >
              Edit
            </button>

            <button
              type="button"
              className="danger-button"
              onClick={() => onDeleteJob(job._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobList;