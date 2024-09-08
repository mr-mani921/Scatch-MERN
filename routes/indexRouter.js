//Importing express and router to handle specific routes coming from app.js
const express = require("express");
const router = express.Router();//                             (8)

router.get("/", (req, res) => {
  const error = req.flash("error");// saving error in flash session. To retrieve it any other file and use it like here we use it in "index.ejs".
  res.render("index", { error });
});

//Exporting the routes to import it in app.js
module.exports = router;
