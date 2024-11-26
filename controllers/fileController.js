const fs = require("fs");
const path = require("path");
const File = require("../models/fileModel");
const validateFile = require('../utils/fileValidation')


const createFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded" });
  }

  const { fileName } = req.body;
  console.log("fileName", fileName)

  const { path: filePath } = req.file;

  if (!fileName) {
    return res.status(400).send({ error: "fileName is required" });
  }

  try {
    const existingFile = await File.findOne({ fileName });
    if (existingFile) {
      return res.status(409).send({ error: "A file with the same name already exists" });
    }

    const fileData = {
      fileName,
      filePath,
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


const readFileById = async (req, res) => {
  const { id } = req.params;  

  if (!id) {
    return res.status(400).send({ error: "ID is required" });
  }

  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).send({ error: "File not found" });
    }

    res.send({
      message: "File retrieved successfully",
      file: file
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error retrieving file metadata" });
  }
};


const readFile = async (req, res) => {
  try {
    const files = await File.find();
    if (!files || files.length === 0) {
      return res.status(404).send({ error: "No files found" });
    }

    res.send({
      message: "Files retrieved successfully",
      files: files
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error retrieving files or metadata" });
  }
};

const updateFile = async (req, res) => {
  const { id } = req.params;
  const { fileName } = validateFile(req.body);

  if (!id || !fileName ) {
    return res.status(400).send({ error: "id, fileName, and filePath are required" });
  }

  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).send({ error: "File not found" });
    }

    // Resolve filePath to an absolute path if it's not already
    // const fullFilePath = path.resolve(filePath); // Resolves relative paths to absolute ones
    // console.log("Full file path:", fullFilePath);

    // if (!fs.existsSync(fullFilePath)) {
    //   return res.status(400).send({ error: "Provided filePath does not exist" });
    // }

    // Update the file metadata
    file.fileName = fileName;
    // file.filePath = fullFilePath;
    file.updatedAt = new Date();  

    const updatedFile = await file.save();
    res.send({
      message: "File updated successfully",
      file: updatedFile
    });
  } catch (err) {
    console.error("Error updating file:", err.message);
    res.status(500).send({ error: "Error updating file" });
  }
};


const deleteFile = async (req, res) => {
  const { id } = req.params;


  if (!id) {
    return res.status(400).send({ error: "id is required" });
  }

  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).send({ error: "File metadata not found" });
    }

    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);  
    }

    await file.deleteOne();  
    res.send({
      file: file,
      message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error deleting file or metadata" });
  }
};

module.exports = {
  createFile,
  deleteFile,
  readFile,
  updateFile,
  readFileById
};
