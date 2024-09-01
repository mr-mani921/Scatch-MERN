const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

//creating mongoose server and handling errors
mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(() => {
    dbgr("connected");
  })
  .catch((err) => {
    dbgr(err);
  });

//Exporting mongoose.connection means exporting the controll of the db.
module.exports = mongoose.connection;
