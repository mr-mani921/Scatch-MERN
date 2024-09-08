//Importing express and router to handle specific routes coming from app.js
const express = require("express");
const router = express.Router();
const productModel = require("../models/product.js"); // Imports the product model to interact with the product collection(userSchema and methods) in the database.
const { setPrdInfo } = require("../controllers/productCardCreator.js"); // method for setting the new product info
const upload = require("../middlewares/multerConfig.js"); //    (10)
const auth = require("../middlewares/auth.js"); // middleware to check if the user is logged in or not.
const ownerAuth = require("../middlewares/ownerAuth.js"); // middleware to check if the user is owner or not.

router.get("/create", ownerAuth, (req, res) => {
  res.render("createproducts", { message: req.flash("success") });
});

//middle wares
router.use(auth);

//Routes:

router.post("/create", upload.single("image"), setPrdInfo);

router.get("/shop", auth, async (req, res) => {
  let products = await productModel.find();
  let error = req.flash("error");
  res.render("shop", { error, products });
});

//Exporting the routes to import it in app.js
module.exports = router;
