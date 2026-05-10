function JobList({ jobs, onEditJob, onDeleteJob }) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <h3>No jobs found</h3>
        <p>Create a new job or change your search/filter options.</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <article className="job-item" key={job._id}>
          <div className="job-info">
            <div className="job-title-row">
              <h3>{job.customerName}</h3>
              <span className="status-badge">{job.status}</span>
            </div>

            <p className="job-address">{job.propertyAddress}</p>

            <div className="job-meta">
              {job.phone && <span>Phone: {job.phone}</span>}
              {job.email && <span>Email: {job.email}</span>}
            </div>

            {job.notes && <p className="job-notes">{job.notes}</p>}
          </div>

          <div className="job-actions">
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
        </article>
      ))}
    </div>
  );
}

export default JobList;