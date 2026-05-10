const mongoose = require("mongoose");

// A schema defines the shape of documents inside a MongoDB collection.
const jobSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    propertyAddress: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Measured", "Designed", "Estimated", "Approved", "Ordered", "Delivered", "Closed"],
      default: "New",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Mongoose will create a MongoDB collection called "jobs".
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;