const jwt = require("jsonwebtoken");
const ownerModel = require("../models/ownerModel");
const { decodeToken } = require("../utils/decodeToken");

module.exports = async function (req, res, next) {
    let token = req.cookies.token2;
  if (!token) {
    req.flash("error", "you need to login First");
    return res.redirect("/");
  }
  try {
    let decodedData = decodeToken(token, process.env.JWT_OWNER_KEY);
    let owner = await ownerModel.findOne({ _id: decodedData.id });
    if (!owner) {
      req.flash("error", "You do not have permission to access this page");
      return res.redirect("/");
    } else {
      next();
    }
  } catch (err) {
    req.flash("error", "Something went wrong");
    console.log(err.message);

    res.redirect("/");
  }
};
