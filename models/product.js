const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:String,
    image:String,
    description:String,
    discount:{
        type:Number,
        default:0
    },
    price:Number,
    bgColor:String,
    panelColor:String,
    textColor:String
});

module.exports = mongoose.model('product',productSchema);