//Importing express and router to handle specific routes coming from app.js
const express = require('express')
const router = express.Router()
const productModel = require('../models/product.js')


//multer

//middle wares
const isloggedIn = require("../middlewares/isloggedIn.js");


router.get('/', (req,res)=> {
    res.send("Its Working")
})

router.get('/create',(req,res)=>{
    res.render('createproducts');
})

router.post('/create',)

router.get('/shop', isloggedIn , async(req,res)=> {
    let products = await productModel.find();
    let error = req.flash('error');
    res.render('shop',{error,products});
})

//Exporting the routes to import it in app.js
module.exports = router;