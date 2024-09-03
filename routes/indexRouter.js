//Importing express and router to handle specific routes coming from app.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const error = req.flash("alreadyRegistered");
  res.render("index.ejs", { error });
});

//Exporting the routes to import it in app.js
module.exports = router;
