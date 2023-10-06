const mongoose = require("mongoose");
require("dotenv").config();

// Establish a connection to the MongoDB database using the URL from the environment variables
const connecion = mongoose.connect(process.env.mongoURL);

// Export the connection object for use in other parts of the application
module.exports = { connecion };
