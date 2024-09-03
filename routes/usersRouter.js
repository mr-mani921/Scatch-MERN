//Importing express and router to handle specific routes coming from app.js
const express = require('express')
const router = express.Router();
const {registerUser,loginUser} = require("../controllers/userController.js");

router.get('/', (req,res)=> {
    res.send("Its Working")
})

router.post('/register', registerUser)
router.post('/login',loginUser)


//Exporting the routes to import it in app.js
module.exports = router;