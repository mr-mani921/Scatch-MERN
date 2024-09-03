const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    picture:String
});

module.exports = mongoose.model("owner", ownerSchema);