const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

//Password Encryption before savnig the document.

userSchema.pre("save",async function (next) {
  //Check if it is a new password or is modified.
  if (!this.isModified('password')) {return next();}
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(this.password, salt);
    console.log(hashedPassword);
    next();
  } catch (err) {
    console.log(err.message);
  }
});

userSchema.methods.comparePasswords = function(userPassword) {
    return bcrypt.compare(userPassword,this.password);
}

module.exports = mongoose.model("user", userSchema);
