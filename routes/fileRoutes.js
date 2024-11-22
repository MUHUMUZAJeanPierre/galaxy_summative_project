const express = require("express");
const {
  createFile,
  readFile,
  updateFile,
  deleteFile,
  readFileById
} = require("../controllers/fileController");
const upload = require('../middleware/multerConfig');
const router = express.Router();


router.post("/", upload.single("file"), createFile);
router.get("/", readFile);  
router.get("/:id", readFileById);  
router.put("/:id", updateFile);  
router.delete("/:id", deleteFile);  

module.exports = router;
