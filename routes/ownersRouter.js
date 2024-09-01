//Importing express and router to handle specific routes coming from app.js
const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel.js");

//Setting routes that will be only available in development enviroment.
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
router.post('/create', async(req,res)=> {
    let {fullName, email, password} = req.body;
    let owners = await ownerModel.find({email});
    console.log(owners);
    
    if(owners.length > 0) {
      console.log("You are not allowed to create more than one owner");
      
      return res.status(501).send('You are not allowed to create more than one owner');
    } else {
      let owner = await ownerModel.create({
        fullName,
        email,
        password
      });
      console.log(owner);
      
      res.send(owner);
    }
})
}

router.get("/", (req, res) => { 
  res.send("Its Working");
}); 

//Exporting the routes to import it in app.js
module.exports = router; 
