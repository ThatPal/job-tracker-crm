import { useEffect, useState } from "react";

const emptyForm = {
  customerName: "",
  phone: "",
  email: "",
  propertyAddress: "",
  status: "New",
  notes: "",
};

function JobForm({ onCreateJob, onUpdateJob, selectedJob, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (selectedJob) {
      setFormData({
        customerName: selectedJob.customerName || "",
        phone: selectedJob.phone || "",
        email: selectedJob.email || "",
        propertyAddress: selectedJob.propertyAddress || "",
        status: selectedJob.status || "New",
        notes: selectedJob.notes || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [selectedJob]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedJob) {
      onUpdateJob(selectedJob._id, formData);
    } else {
      onCreateJob(formData);
    }

    setFormData(emptyForm);
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
        {selectedJob ? "Update Job" : "Add Job"}
      </button>

      {selectedJob && (
        <button type="button" className="secondary-button" onClick={onCancelEdit}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default JobForm;