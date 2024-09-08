const ownerModel = require("../models/ownerModel.js");
const { genOwnerToken } = require("../utils/generateToken.js");

// func for creating a new owner which will be only available in development enviroment.
exports.registerOwner = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    let owners = await ownerModel.find({ email });
    // will check if there is any other owner if it is then it will not create the second.
    if (owners.length > 0) {
      console.log("You are not allowed to create more than one owner");
      return res
        .status(501)
        .send("You are not allowed to create more than one owner");
    } else {
      //if there is not any owner then it will create one
      await ownerModel.create({
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

// func for logging in as owner 
exports.loginOwner = async (req, res) => {
  try {
    let { email, password } = req.body;
    let owner = await ownerModel.findOne({ email });
    // logIn only if there is any owner with the email
    if (!owner) {
      req.flash("error", "You need to register as owner first");
      res.redirect("/owners/login");
    } else {
      // if there is any owner with the same email then it will check if the password is correct or not by using the func
      let isMatch = await owner.comparePasswords(password);
      if (isMatch) {
        let ownerId = owner._id;
        let ownerToken = genOwnerToken(ownerId)
        res.cookie('token2',ownerToken)
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
