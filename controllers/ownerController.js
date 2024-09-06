const ownerModel = require("../models/ownerModel.js");

exports.registerOwner = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    let owners = await ownerModel.find({ email });

    if (owners.length > 0) {
      console.log("You are not allowed to create more than one owner");
      return res
        .status(501)
        .send("You are not allowed to create more than one owner");
    } else {
      let owner = await ownerModel.create({
        fullName,
        email,
        password,
      });
      res.render("admin");
    }
  } catch (err) {
    res.status(501).send(err.message);
  }
};

exports.loginOwner = async (req, res) => {
  try {
    let { email, password } = req.body;
    let owner = await ownerModel.findOne({ email });

    if (!owner) {
      req.flash("error", "You need to register as owner first");
      res.redirect("/owners/login");
    } else {
      let isMatch = await owner.comparePasswords(password);
      if (isMatch) {
        req.flash('success','Hey admin');
        return res.redirect('/owners/adminpanel');
      }
      req.flash("error", "email or password incorrect");
      res.redirect("/owners/login");
    }
  } catch (err) {
    console.log(err.message);
    res.status(501).send("Something went Wrong");
  }
};
