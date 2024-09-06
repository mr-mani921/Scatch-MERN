const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "/public/assets/images"));
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(10, (err, buffer) => {
      if (err) {
        return console.log("Error during generating the random name for file");
      }
      const fn = buffer.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
