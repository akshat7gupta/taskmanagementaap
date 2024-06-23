// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const { connectToMongoDB } = require("./database"); // Import function to connect to MongoDB
const path = require("path");

// Create an instance of Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, "build")));

// Route to serve the index.html file for the root path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
});

// Import router for API endpoints
const router = require("./routes");
app.use("/api", router); // Mount router middleware at /api path

// Define the port for the server to listen on, defaulting to 5000
const port = process.env.PORT || 5000;

// Asynchronous function to start the server
async function startServer() {
    await connectToMongoDB(); // Connect to MongoDB
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
}

// Start the server
startServer();
