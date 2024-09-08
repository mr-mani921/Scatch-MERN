const userModel = require("../models/user"); //Getting user model for db operations
require("dotenv").config(); //To get env variables
const { genUserToken } = require("../utils/generateToken"); // util func for generate token to add it in cookie.
const { decodeToken } = require("../utils/decodeToken"); // util func for decode the token to get the info stored in it.

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
    const token = genUserToken(newUser);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.redirect(302, "/products/shop");
  } catch (err) {
    console.log(err.message);
    req.flash('error',"Something went wrong Please try again later");
    res.redirect('/');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    //checking if the email entered by the user have any account or not otherwise they have to signUp/register first
    if (!user) {
      req.flash("error", "Email or Password Incoorect");
      return res.redirect("/");
    } else {
      // checking if the password is correct or not by using a func.
      let isMatch = await user.comparePasswords(password);
      if (isMatch === true) {
        const token = genUserToken(user);
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.redirect("/products/shop");
      } else {
        req.flash("error", "email or password incorrect");
        res.redirect("/");
      }
    }
  } catch (err) {
    console.log(err.message);
    req.flash("error", err.message);
    res.redirect("/");
  }
};

// func for first finding the product by its id and then adding the that id in users cart.
exports.addPrdToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userData = decodeToken(req.cookies.token, JWT_USER_KEY);
    let user = await userModel.findOne({ email: userData.email });
    await user.cart.push(productId);
    await user.save();

    res.redirect("/products/shop");
  } catch (err) {
    res.status(501).send(err.message);
  }
};
