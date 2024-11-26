const express = require("express");
const {
  createFile,
  readFile,
  updateFile,
  deleteFile,
  readFileById
} = require("../controllers/fileController");
const upload = require("../middleware/multerConfig");
const { authenticateToken } = require("../middleware/authorization");

const router = express.Router();

router.post("/",authenticateToken, upload.single("file"), createFile);
router.get("/",authenticateToken ,readFile);
router.get("/:id", authenticateToken, readFileById);
router.put("/:id", authenticateToken, updateFile);
router.delete("/:id", authenticateToken, deleteFile);

module.exports = router;
