const fs = require("fs");
const path = require("path");
const File = require("../models/fileModel");

const createFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded" });
  }

  const { userId, fileName } = req.body;
  const { filename, path: filePath, size } = req.file;

  if (!userId || !fileName) {
    return res.status(400).send({ error: "userId and fileName are required" });
  }

  try {
    const fileData = {
      userId,
      fileName,
      filePath,
      size,
    };

    const newFile = new File(fileData);
    await newFile.save();

    res.status(201).send({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error saving file metadata to database" });
  }
};

const readFile = async (req, res) => {
  const { userId, fileName } = req.query;

  if (!userId || !fileName) {
    return res.status(400).send({ error: "userId and fileName are required" });
  }

  try {
    const file = await File.findOne({ userId, fileName });
    if (!file) {
      return res.status(404).send({ error: "File metadata not found" });
    }

    if (!fs.existsSync(file.filePath)) {
      return res.status(404).send({ error: "File content not found on disk" });
    }

    const content = fs.readFileSync(file.filePath, "utf-8");
    res.send({ file, content });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error reading file metadata or content" });
  }
};

const updateFile = async (req, res) => {
  const { userId, fileName, content } = req.body;

  if (!userId || !fileName || content === undefined) {
    return res.status(400).send({ error: "userId, fileName, and content are required" });
  }

  try {
    const file = await File.findOne({ userId, fileName });
    if (!file) {
      return res.status(404).send({ error: "File metadata not found" });
    }

    if (!fs.existsSync(file.filePath)) {
      return res.status(404).send({ error: "File content not found on disk" });
    }

    fs.writeFileSync(file.filePath, content);
    const stats = fs.statSync(file.filePath);
    file.size = stats.size;

    await file.save();
    res.send({ message: "File updated successfully", file });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error updating file or metadata" });
  }
};

 const deleteFile = async (req, res) => {
  const { userId, fileName } = req.body;

  if (!userId || !fileName) {
    return res.status(400).send({ error: "userId and fileName are required" });
  }

  try {
    const file = await File.findOne({ userId, fileName });
    if (!file) {
      return res.status(404).send({ error: "File metadata not found" });
    }

    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath); 
    }

    await file.remove();
    res.send({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error deleting file or metadata" });
  }
};

module.exports= {
    createFile,
    deleteFile,
    readFile,
    updateFile,
}
