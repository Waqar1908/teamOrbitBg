const multer = require("multer");
const path = require("path");

// common storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// 🔹 different exports
module.exports = {
  uploadSingle: (field) => upload.single(field),
  uploadMultiple: (field, count) => upload.array(field, count),
  uploadFields: (fields) => upload.fields(fields)
};