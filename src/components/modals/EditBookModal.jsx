import { useState } from "react";

const EditBookModal = ({ book, onClose, onSave }) => {
  const [form, setForm] = useState({ ...book });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] flex flex-col gap-3"
      >
        <h2 className="text-xl font-bold mb-2">Edit Book</h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Title"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Author"
          required
        />
        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Genre"
          required
        />
        <input
          name="publishedYear"
          value={form.publishedYear}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Published Year"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
        <div className="flex gap-2 mt-4 justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookModal;
