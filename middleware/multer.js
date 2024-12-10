const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (/\.(jpg|jpeg|png)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only jpg, jpeg, and png are allowed."));
    }
  },
}).single("categoryImage");

module.exports = upload;
