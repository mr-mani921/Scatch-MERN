const productModel = require('../models/product')

// func for creating a new product with setting up the its info entered by owner.
exports.setPrdInfo = async(req,res) => {
    let {name,price,discount,bgColor,panelColor,textColor} = req.body;   
    
    let product = productModel.create({
        image: req.file.filename,
        name,
        price,
        discount,
        panelColor,
        bgColor,
        textColor
    });
    req.flash('success','Product Card Created Successfully');
    res.redirect('/products/create');
}