const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ownerSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  picture: String,
});

ownerSchema.pre("save", async function (next) {
  //Check if it is a new password or is modified.
  if (!this.isModified("password")) {
    return next();
  }
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.log(err.message);
  }
});

ownerSchema.methods.comparePasswords = function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("owner", ownerSchema);
