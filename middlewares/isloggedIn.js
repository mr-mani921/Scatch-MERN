const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async function (req, res, next) {
    
  let token = req.user.token;
  console.log(token);  
  if (!token) {
    req.flash("error", "you need to login First");
    return res.redirect("/");
  }
  try {
    let decodedData = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decodedData.email })
      .select("-password");
    req.user = user;
    next();
  } catch (err) {
    res.flash("error", "Something went wrong");
    res.redirect("/");
  }
};
