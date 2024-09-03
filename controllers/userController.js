const userModel = require("../models/user"); //Getting user model for db operations
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();//To get env variables
const {generateToken} = require('../utils/generateToken')

exports.registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      console.log("Already a user");
      return res.status(401).send("You Already have an account with the same email");
    }
    let newUser = await userModel.create({
      fullName,
      email,
      password,
    });
    let token = generateToken(newUser);
    res.cookie('token',token, { httpOnly: true })
    res.redirect(302,'/products/shop');
  } catch (err) {
    res.status(500).send('Server Error');
    console.log(err.message);
  }
}

exports.loginUser = async(req,res) => {
  const {email,password} = req.body;
  let user = await userModel.findOne({email});
  if(!user) {
    console.log("need to signIn first");
    return res.status(401).send("Email or Password Incoorect");
  }

  let isMatch = await user.comparePasswords(password)
  console.log(isMatch);
  if(isMatch === true) {
    const token = generateToken(user);
    res.cookie('token',token);
    res.redirect('/products/shop');
  } else {
    res.status(501).send('email or password incorrect');
  }
}