const userModel = require("../models/user"); //Getting user model for db operations
const jwt = require("jsonwebtoken");
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
//worked absolutely fine till here