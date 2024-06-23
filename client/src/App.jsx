import React, { useEffect, useState } from 'react';
import Todo from './Todo'; // Import the Todo component
import EditModal from './EditModal'; // Import the EditModal component

export default function App() {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);
  // State to manage the content of the new todo
  const [content, setContent] = useState('');
  // State to manage the todo being edited
  const [editTodo, setEditTodo] = useState(null);

  // Fetch the initial list of todos when the component mounts
  useEffect(() => {
    async function getTodos() {
      const res = await fetch('/api/todos'); // Fetch todos from the API
      const todos = await res.json(); // Convert response to JSON
      setTodos(todos); // Set the fetched todos in state
    }
    getTodos();
  }, []);

  // Function to create a new todo
  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) { // Check if the content length is greater than 3
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ todo: content }), // Send the new todo content
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newTodo = await res.json(); // Convert response to JSON
      setContent(''); // Clear the input field
      setTodos([...todos, newTodo]); // Add the new todo to the list
    }
  };

  // Function to update an existing todo
  const updateTodo = async () => {
    const res = await fetch(`/api/todos/${editTodo._id}`, {
      method: 'PUT',
      body: JSON.stringify({ todo: content }), // Send the updated todo content
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const updatedTodo = await res.json(); // Convert response to JSON
    if (updatedTodo) {
      // Update the todo in the list
      setTodos(todos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    }
  };

  // Function to delete a todo
  const deleteTodo = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE',
    });
    const json = await res.json(); // Convert response to JSON
    if (json.acknowledged) {
      // Remove the deleted todo from the list
      setTodos(todos.filter(todo => todo._id !== todoId));
    }
  };

  // Function to open the edit modal
  const openEditModal = (todo) => {
    setEditTodo(todo); // Set the todo to be edited
    setContent(todo.todo); // Set the content of the todo to be edited
    
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setEditTodo(null); // Clear the todo being edited
    setContent(''); // Clear the content field
    
  };

  // Render the application UI
  return (
    <main className="container">
      <h1 className="title">Task Management App</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo..."
          className="form__input"
          required
        />
        <button className="form__button" type="submit">
          Create Todo
        </button>
      </form>
      <div className="todos">
        {todos.length > 0 &&
          todos.map(todo => (
            <Todo
              key={todo._id}
              todo={todo}
              setTodos={setTodos}
              openEditModal={openEditModal}
              deleteTodo={deleteTodo}
            />
          ))}
      </div>
      {editTodo && (
        <EditModal
          content={content}
          setContent={setContent}
          updateTodo={updateTodo}
          closeEditModal={closeEditModal}
        />
      )}
    </main>
  );
}
