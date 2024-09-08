const userModel = require("../models/user"); //Getting user model for db operations
require("dotenv").config(); //To get env variables
const { generateToken } = require("../utils/generateToken");// util func for generate token to add it in cookie.
const { decodeToken } = require("../utils/decodeToken");// util func for decode the token to get the info stored in it.

exports.registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    let user = await userModel.findOne({ email: email });
    //if user with the same email pre-exists then displaying the message and redirecting them to login not signUp/register
    if (user) {
      req.flash("error", "You Already have an account with the same email");
      return res.redirect("/");
    }
    //other wise it will create a new user
    let newUser = await userModel.create({
      fullName,
      email,
      password,
    });
    //and generate token and stick it as a cookie
    let token = generateToken(newUser);
    res.cookie("token", token, { httpOnly: true });
    res.redirect(302, "/products/shop");
  } catch (err) {
    res.status(500).send("Server Error");
    console.log(err.message);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  //checking if the email entered by the user have any account or not otherwise they have to signUp/register first
  if (!user) {
    req.flash("error", "Email or Password Incoorect");
    return res.redirect("/");
  }
  // checking if the password is correct or not by using a func.
  let isMatch = await user.comparePasswords(password);
  if (isMatch === true) {
    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/products/shop");
  } else {
    req.flash("error", "email or password incorrect");
    res.redirect("/");
  }
};

// func for first finding the product by its id and then adding the that id in users cart.
exports.addPrdToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userData = decodeToken(req.cookies.token);
    let user = await userModel.findOne({ email: userData.email });
    await user.cart.push(productId);
    await user.save();

    res.redirect("/products/shop");
  } catch (err) {
    res.status(501).send(err.message);
  }
};
