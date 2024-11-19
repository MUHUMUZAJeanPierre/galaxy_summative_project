const express = require("express");
const connectDB = require("./config/db");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/files", fileRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
