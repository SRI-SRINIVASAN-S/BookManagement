import React from "react";

const ConfirmDeleteModal = ({ book, onClose, onConfirm }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] flex flex-col gap-3">
      <h2 className="text-xl font-bold mb-2 text-red-600">Delete Book</h2>
      <p>
        Are you sure you want to delete{" "}
        <span className="font-semibold">{book.title}</span>?
      </p>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Delete
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDeleteModal;
