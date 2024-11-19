const multer = require("multer");
const path = require("path");

// Ensure the directory exists
const uploadDirectory = path.join(__dirname, "../user_files");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
