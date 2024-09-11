const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

// Connecting to MongoDB Atlas
const mongoURI = process.env.MONGODB_URI || config.get("MONGODB_URI");

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI); // No need for deprecated options
    dbgr("Connected to MongoDB");
  } catch (error) {
    dbgr("Error connecting to MongoDB:", error);
  }
};

// Call the async function
connectToDB();

// Exporting mongoose connection for use in other parts of the app
module.exports = mongoose.connection;
