const multer = require("multer"); //                           (13)
const path = require("path");
const crypto = require("crypto"); //                           (14)

// Telling multer which type of storage to use for saving the files uploaded from the forms.
const storage = multer.diskStorage({
  destination: function (req, file, cb) { //specifying the destination where the files should be saved.
    cb(null, path.join(path.dirname(__dirname), "/public/assets/images"));
  },
  filename: function (req, file, cb) { // func for setting the unique filenames
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
