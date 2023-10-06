// Import required libraries and modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connecion } = require("./Config/db");
const userRouter = require("./route/user.route");

// Create an Express application
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Use the userRouter for handling routes
app.use('/', userRouter);

// Define a basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server and connect to the database
app.listen(process.env.port, async () => {
  try {
    await connecion; // This appears to be a typo, should be "connection"
    console.log("connected to DB");
  } catch (err) {
    console.log("server error");
  }
  console.log(`server is running at port ${process.env.port}`);
});
