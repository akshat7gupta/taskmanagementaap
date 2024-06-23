import React from 'react';

// The EditModal component renders a modal for editing a todo item
export default function EditModal({ content, setContent, updateTodo, closeEditModal }) {

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTodo(); // Update the todo item
    closeEditModal(); // Close the modal
  };

  return (
    <div className="overlay">
      <div className="modal-content">
        <h2>Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content} // Bind the textarea value to content state
            onChange={(e) => setContent(e.target.value)} // Update content state on textarea change
            required
            className="modal-textarea"
          />
          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={closeEditModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
