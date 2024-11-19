const express = require("express");
const {
  createFile,
  readFile,
  updateFile,
  deleteFile,
} = require("../controllers/fileController");
const upload = require('../middleware/multerConfig');
const router = express.Router();

// POST - Upload a file
router.post("/", upload.single("file"), createFile);

// GET - Read a file
router.get("/", readFile);  // This expects query params: ?userId=12345&fileName=example.txt

// PUT - Update file content
router.put("/", updateFile);  // Expects { userId, fileName, content } in the body

// DELETE - Delete a file
router.delete("/", deleteFile);  // Expects { userId, fileName } in the body

module.exports = router;
