//Importing express and router to handle specific routes coming from app.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js'); // Imports the user model to interact with the User collection(userSchema and methods) in the database
const auth = require('../middlewares/auth.js');
const {decodeToken} = require('../utils/decodeToken.js');// A utility that decodes the token parsed as a cookie because it contains user info.
const {registerUser,loginUser, addPrdToCart} = require("../controllers/userController.js");

// Routes:
// Calling methods to handle these routes
router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/addProduct', addPrdToCart);

router.get('/cart', auth, async(req,res)=> {
    let data = decodeToken(req.cookies.token, process.env.JWT_USER_KEY); //using util func for decoding the token and getting the data from it.
    let user = await userModel.findOne({email:data.email});
    await user.populate('cart'); //                            (9)
    let cartProducts = user.cart;
    res.render('cart',{cartProducts}); // rendering the cart.ejs file and providing it the users cart info.
});


//Exporting the routes to import it in app.js
module.exports = router;