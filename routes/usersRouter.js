//Importing express and router to handle specific routes coming from app.js
const express = require('express')
const router = express.Router();

router.get('/', (req,res)=> {
    res.send("Its Working")
});

//Exporting the routes to import it in app.js
module.exports = router;