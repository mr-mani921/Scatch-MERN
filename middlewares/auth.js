//checks if the user has logged In or have any account or not.
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async function (req, res, next) {
  let token = req.cookies.token;
  if (!token) {
    req.flash("error", "you need to login First");
    return res.redirect("/");
  }
  try {
    let decodedData = jwt.verify(req.cookies.token, process.env.JWT_USER_KEY);
    let user = await userModel
      .findOne({ email: decodedData.email })
      .select("-password");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }
    next();
  } catch (err) {
    req.flash("error", "Something went wrong");
    console.log(err.message);
    
    res.redirect("/");
  }
};
