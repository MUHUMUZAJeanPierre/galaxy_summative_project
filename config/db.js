const mongoose = require("mongoose");
require("dotenv").config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION).then(()=>{
      // mongodb+srv://jmuhumuza:iPuYqJhqD6enwl7C@cluster0.l9ktd.mongodb.net/
      // mongodb+srv://jmuhumuza:<db_password>@cluster0.l9ktd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
      console.log("MongoDB connected successfully.", );
    })
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
