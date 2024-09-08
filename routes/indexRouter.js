//Importing express and router to handle specific routes coming from app.js
const express = require("express");
const router = express.Router();//                             (8)


router.get("/", (req, res) => {
  res.clearCookie('token'); // will remove the token everytime when we redirected to the login page.
  const error = req.flash("error");// getting the message/error stored in flash session. And handing over it to "index.ejs" to be displayed there.
  res.render("index", { error });
});

//Exporting the routes to import it in app.js
module.exports = router;
