const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { connectDB } = require('./db'); 
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth'); 

const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB
connectDB(); // Call the function to connect to the database

// Authentication routes
app.use('/auth', authRoute);

// Posts routes (protected by JWT)
app.use('/posts', postsRoute); 

const PORT = process.env.PORT || 19000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app and server
module.exports = { app, server };