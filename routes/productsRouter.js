//Importing express and router to handle specific routes coming from app.js
const express = require('express')
const router = express.Router();

//middle wares
const isloggedIn = require("../middlewares/isloggedIn.js");


router.get('/', (req,res)=> {
    res.send("Its Working")
});

router.get('/shop', isloggedIn , (req,res)=> {
    let error = req.flash('error');
    res.redirect('/');
})

//Exporting the routes to import it in app.js
module.exports = router;