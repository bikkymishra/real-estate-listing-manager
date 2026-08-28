require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/properties", propertyRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Real Estate Listing Manager API is running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});