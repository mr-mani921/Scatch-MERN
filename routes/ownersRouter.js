//Importing express and router to handle specific routes coming from app.js
const express = require("express");
const router = express.Router();
const { registerOwner } = require("../controllers/ownerController.js");
const { loginOwner } = require("../controllers/ownerController.js");
const productModel = require("../models/product.js"); // Imports the owner model to interact with the owner collection(userSchema and methods) in the database.
const ownerAuth = require("../middlewares/ownerAuth.js");

//Setting routes that will be only available in development enviroment.

if (process.env.NODE_ENV === "development") {
  router.post("/create", registerOwner);
}

router.get("/login", (req, res) => {
  res.clearCookie('token2')
  const message = req.flash("error");
  res.render("owner-login", { message });
});
router.post("/login", loginOwner);

router.get("/adminpanel", ownerAuth, async (req, res) => {
  const products = await productModel.find();
  res.render("admin", { message: req.flash("success"), products });
});

//Exporting the routes to import it in app.js
module.exports = router;
