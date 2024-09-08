const jwt = require("jsonwebtoken");
exports.genUserToken = function (user) {
  return jwt.sign(
    { id: user._id, email: user.email }, // payload
    process.env.JWT_USER_KEY, // secret key
    { expiresIn: "1h" } // token expiration
  );
};

exports.genOwnerToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_OWNER_KEY, { expiresIn: "30min" });
};
