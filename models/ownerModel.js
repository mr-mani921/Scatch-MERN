const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ownerSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  picture: String,
});


//Adds the method to ownerSchema methods for Password Encryption before savnig the document.
ownerSchema.pre("save", async function (next) {
  //Check if it is a new password or is modified.
  if (!this.isModified("password")) {
    return next();
  }
  try {
    let salt = await bcrypt.genSalt(10); // generate some unt-shant chars.
    let hashedPassword = await bcrypt.hash(this.password, salt); // change to plain text password to some hashed password.
    this.password = hashedPassword; // changes the incoming password with the hasshed password after that it can be saved in db.
    next();
  } catch (err) {
    console.log(err.message);
  }
});

// Method for comparing the plain password(that owner input for logging in) with the hashed password saved in db.
ownerSchema.methods.comparePasswords = function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("owner", ownerSchema);
