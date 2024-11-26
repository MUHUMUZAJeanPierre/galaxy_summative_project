const express = require("express");
const connectDB = require("./config/db");
const fileRoutes = require("./routes/fileRoutes");
const  router = require('./routes/User')

const app = express();
app.use(express.json());

connectDB();
app.use("/files", fileRoutes);
app.use('/', router)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
