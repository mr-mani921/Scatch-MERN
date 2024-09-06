const productModel = require('../models/product')

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