// This component displays the form for creating a new job.
// Later, it will send form data to the backend API.

function JobForm() {
  return (
    <form className="job-form">
      <div className="form-group">
        <label>Customer Name</label>
        <input type="text" placeholder="Enter customer name" />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input type="text" placeholder="Enter phone number" />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="Enter email address" />
      </div>

      <div className="form-group">
        <label>Property Address</label>
        <input type="text" placeholder="Enter property address" />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select defaultValue="New">
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

      <div className="form-group">
        <label>Notes</label>
        <textarea placeholder="Enter job notes" rows="4"></textarea>
      </div>

      <button type="submit" className="primary-button">
        Add Job
      </button>
    </form>
  );
}

export default JobForm;