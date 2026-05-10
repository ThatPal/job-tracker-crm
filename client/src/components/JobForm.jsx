import { useState } from "react";

// This component displays the form for creating a new job.
// It stores the form values in React state and sends them to the backend.

function JobForm({ onCreateJob }) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    propertyAddress: "",
    status: "New",
    notes: "",
  });

  // Updates the matching field in formData whenever the user types.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Sends the form data to App.jsx when submitted.
  const handleSubmit = (event) => {
    event.preventDefault();

    onCreateJob(formData);

    setFormData({
      customerName: "",
      phone: "",
      email: "",
      propertyAddress: "",
      status: "New",
      notes: "",
    });
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Enter customer name"
          required
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />
      </div>

      <div className="form-group">
        <label>Property Address</label>
        <input
          type="text"
          name="propertyAddress"
          value={formData.propertyAddress}
          onChange={handleChange}
          placeholder="Enter property address"
          required
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
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
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter job notes"
          rows="4"
        ></textarea>
      </div>

      <button type="submit" className="primary-button">
        Add Job
      </button>
    </form>
  );
}

export default JobForm;