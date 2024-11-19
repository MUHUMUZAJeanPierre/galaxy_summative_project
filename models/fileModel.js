const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", FileSchema);
