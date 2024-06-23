import React from 'react';

export default function Todo({
  todo,
  setTodos,
  openEditModal,
  deleteTodo
}) {
  // Function to update the status of a todo item
  const updateStatus = async (todoId, todoStatus) => {
    try {
      // Send a PUT request to update the todo status
      const res = await fetch(`/api/todos/${todoId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: todoStatus }),
      });

      // Check if the response is not okay, throw an error
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Parse the response JSON data
      const updatedTodo = await res.json();

      // Update the state locally with the updated todo status
      setTodos(currentTodos => {
        return currentTodos.map(currentTodo => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        });
      });

      // Example usage of updatedTodo in console log
      console.log("Updated Todo:", updatedTodo);
    } catch (error) {
      // Handle errors if any
      console.error("Error updating todo:", error.message);
    }
  };

  // Function to handle deletion of a todo item
  const handleDelete = (todoId) => {
    // Ask for confirmation before deleting the task
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTodo(todoId); // Call deleteTodo function passed via props
    }
  };

  // Render each todo item with its content and mutation buttons
  return (
    <div className="todo">
      <p>{todo.todo}</p>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateStatus(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"} {/* Show different status icons based on todo status */}
        </button>
        <button
          className="todo__edit"
          onClick={() => openEditModal(todo)}
        >
          ✏️ {/* Edit icon button */}
        </button>
        <button
          className="todo__delete"
          onClick={() => handleDelete(todo._id)}
        >
          🗑️ {/* Delete icon button */}
        </button>
      </div>
    </div>
  );
}
