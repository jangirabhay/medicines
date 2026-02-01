require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/medicines", require("./api/medicines"));

/* Test route */
app.get("/", (req, res) => {
  res.send("Medicine API running ✅");
});

/* Start server (LOCAL) */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
