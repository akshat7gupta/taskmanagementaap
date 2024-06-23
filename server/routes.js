const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");

// Function to get the MongoDB collection instance for todos
const getCollection = () => {
  const client = getConnectedClient(); // Get MongoDB client instance
  return client.db("todosdb").collection("todos"); // Return todos collection
}

// GET /todos
router.get("/todos", async (req, res) => {
  const collection = getCollection(); // Get todos collection
  const todos = await collection.find({}).toArray(); // Retrieve all todos as an array
  res.status(200).json(todos); // Respond with todos array
});

// POST /todos
router.post("/todos", async (req, res) => {
  const collection = getCollection(); // Get todos collection
  let { todo } = req.body; // Extract todo from request body

  // Validate todo
  if (!todo) {
    return res.status(400).json({ msg: "error no todo found" });
  }

  // Convert todo to string if it's not already a string
  todo = typeof todo === "string" ? todo : JSON.stringify(todo);

  // Insert new todo into collection
  const newTodo = await collection.insertOne({ todo, status: false });

  // Respond with inserted todo object
  res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  const collection = getCollection(); // Get todos collection
  const _id = new ObjectId(req.params.id); // Convert id parameter to ObjectId
  const deletedTodo = await collection.deleteOne({ _id }); // Delete todo with specified id
  res.status(200).json(deletedTodo); // Respond with deletion result
});

// PUT /todos/:id/status
router.put("/todos/:id/status", async (req, res) => {
  const collection = getCollection(); // Get todos collection
  const _id = new ObjectId(req.params.id); // Convert id parameter to ObjectId
  const { status } = req.body; // Extract status from request body

  // Validate status
  if (typeof status !== "boolean") {
    return res.status(400).json({ msg: "invalid status" });
  }

  // Toggle status of todo with specified id
  const updatedTodo = await collection.updateOne({ _id }, { $set: { status: !status } });

  // Respond with update result
  res.status(200).json(updatedTodo);
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  const collection = getCollection(); // Get todos collection
  const _id = new ObjectId(req.params.id); // Convert id parameter to ObjectId
  const { todo } = req.body; // Extract todo from request body

  // Validate todo
  if (typeof todo !== "string" || !todo) {
    return res.status(400).json({ msg: "invalid todo" });
  }

  // Update todo with specified id
  const updatedTodo = await collection.updateOne({ _id }, { $set: { todo } });

  // Respond with update result
  res.status(200).json(updatedTodo);
});

module.exports = router; // Export router with defined endpoints
