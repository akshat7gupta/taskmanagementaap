// client/DeletePrompt.jsx
import React from 'react';

// The DeletePrompt component renders a modal asking the user for delete confirmation
export default function DeletePrompt({ handleDelete }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this todo?</h2>
              <button onClick={() => handleDelete(true)}>Yes</button>{/* Call handleDelete with true when 'Yes' is clicked */}
        <button onClick={() => handleDelete(false)}>No</button>{/* Call handleDelete with true when 'No' is clicked */}
      </div>
    </div>
  );
}
