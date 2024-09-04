//Importing express and router to handle specific routes coming from app.js
const express = require("express");
const router = express.Router();
const { registerOwner } = require("../controllers/ownerController.js");
const { loginOwner } = require("../controllers/ownerController.js");

//Setting routes that will be only available in development enviroment.
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  router.post("/create", registerOwner);
}

router.get("/login", (req, res) => {
  const message = req.flash('error');
  res.render("owner-login",{message});
});
router.post("/login", loginOwner);

router.get('/owners/adminpanel', (req,res)=> {
  res.render('admin',{message: req.flash('success')});
});

//Exporting the routes to import it in app.js
module.exports = router;
