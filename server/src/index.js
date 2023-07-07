const express = require("express");
const mongoose = require("mongoose");
const connectToDatabase = require("./config/db");
const route = require("./routes/route");
const postRoutes = require("./routes/postRoutes");
const dotenv = require("dotenv");
const cors=require("cors");
dotenv.config();

const app = express();

// Connect to MongoDB
connectToDatabase();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello, World!");
});




// Routes

// Add more routes here
app.use("/api", route);
app.use("/",postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
