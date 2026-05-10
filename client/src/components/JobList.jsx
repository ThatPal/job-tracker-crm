// This component displays jobs received from the backend.

function JobList({ jobs }) {
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
          </div>

          <span className="status-badge">{job.status}</span>
        </div>
      ))}
    </div>
  );
}

export default JobList;