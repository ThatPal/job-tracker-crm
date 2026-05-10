// This component displays a list of jobs.
// For now, we are using sample data.
// Later, this data will come from MongoDB through our backend API.

const sampleJobs = [
  {
    id: 1,
    customerName: "John Smith",
    phone: "845-555-1234",
    propertyAddress: "123 Main Street, Monsey NY",
    status: "New",
  },
  {
    id: 2,
    customerName: "Sarah Cohen",
    phone: "845-555-9876",
    propertyAddress: "45 Oak Drive, Spring Valley NY",
    status: "Measured",
  },
];

function JobList() {
  return (
    <div className="job-list">
      {sampleJobs.map((job) => (
        <div className="job-item" key={job.id}>
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