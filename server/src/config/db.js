// Import mongoose so we can connect to MongoDB.
const mongoose = require("mongoose");

// This function connects our Express server to MongoDB.
const connectDB = async () => {
  try {
    // process.env.MONGO_URI comes from the .env file.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);

    // Exit the server if the database connection fails.
    process.exit(1);
  }
};

module.exports = connectDB;