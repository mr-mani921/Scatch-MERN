const jwt = require('jsonwebtoken') //                         (12)

exports.decodeToken = function(token) {
    return decodedData = jwt.verify(token, process.env.JWT_KEY);//requires the key or secret that was used for encrypting/coding the token.
} 