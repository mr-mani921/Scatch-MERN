const jwt = require('jsonwebtoken') //                         (12)

exports.decodeToken = function(token, secretkey) {
    return decodedData = jwt.verify(token, secretkey);//requires the key or secret that was used for encrypting/coding the token.
} 