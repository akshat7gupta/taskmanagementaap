// Load environment variables from .env file
require("dotenv").config();

// Import necessary MongoDB modules
const { MongoClient, ServerApiVersion } = require("mongodb");

// MongoDB connection URI, default to localhost if not provided in environment
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

// MongoDB connection options including serverApi version configuration
const options = {
    serverApi: {
        version: ServerApiVersion.v1, // Use MongoDB Server API version 1
        strict: true, // Enable strict mode for API behavior
        deprecationErrors: true, // Raise errors for deprecated API usage
    }
};

let client; // MongoDB client instance

// Asynchronous function to connect to MongoDB
const connectToMongoDB = async () => {
    // Connect only if client is not already connected
    if (!client) {
        try {
            client = await MongoClient.connect(uri, options); // Connect to MongoDB using URI and options
            console.log("Connected to MongoDB");
        } catch (error) {
            console.log(error); // Log any errors that occur during connection
        }
    }
    return client; // Return the MongoDB client instance
};

// Function to retrieve the connected MongoDB client instance
const getConnectedClient = () => client;

// Export the functions to be used in other parts of the application
module.exports = { connectToMongoDB, getConnectedClient };
