# Blogging Platform API

## Overview
This is a RESTful API for managing blog posts with features such as authentication, authorization, and CRUD (Create, Read, Update, Delete) operations on posts. It is built using Node.js, Express, and MongoDB.

## Features
- User registration and authentication using JWT (JSON Web Tokens).
- CRUD operations for blog posts.
- Pagination for retrieving posts.
- Filtering of posts based on author and creation date.
- Unit tests for API endpoints.

## Requirements
- Node.js (version 14 or higher)
- MongoDB (version 4.0 or higher)
- Postman or similar tool for testing the API.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Suchi2102/blogging-platform-backend.git
   cd blogging-platform
2. Install necessary dependencies:
   npm install express mongoose body-parser
   npm install express-jwt jsonwebtoken bcryptjs
   npm install --save-dev jest supertest
3. Set up environment variables:
   Create a .env file and add your MongoDB connection string.
   MONGODB_URI=mongodb://localhost:27017/your_database_name
4. Start the server
   npm start
Running Tests
To run the unit tests, execute:
npm test

URL for published documentation
https://documenter.getpostman.com/view/38814313/2sAXxMgZXo

