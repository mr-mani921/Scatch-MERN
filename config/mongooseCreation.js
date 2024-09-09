const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

// Connecting to MongoDB Atlas
mongoose
  .connect(config.get("MONGODB_URI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    dbgr("Connected to MongoDB...");
  })
  .catch((err) => {
    dbgr("Error connecting to MongoDB:", err);
  });

// Exporting mongoose connection for use in other parts of the app
module.exports = mongoose.connection;
