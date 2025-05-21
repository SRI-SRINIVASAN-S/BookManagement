import axios from "axios";
import BookCard from "../components/BookCard";
import Header from "../components/Header";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EditBookModal from "../components/EditBookModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants/api";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All");
  const [status, setStatus] = useState("All");
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);

  const fetchBooksInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE_URL);
      setBooks(res.data);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksInfo();
  }, []);

  // Filter books by title, genre, and status
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = genre === "All" || book.genre === genre;
    const matchesStatus = status === "All" || book.status === status;
    return matchesTitle && matchesGenre && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const currentBooks = filteredBooks.slice(startIdx, startIdx + PAGE_SIZE);

  // Reset to first page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genre, status]);

  // Edit handlers
  const handleEdit = (book) => setEditBook(book);
  const handleUpdateBook = async (updatedBook) => {
    try {
      await axios.put(`${API_BASE_URL}/${updatedBook._id}`, updatedBook);
      setBooks((prev) =>
        prev.map((b) => (b._id === updatedBook._id ? updatedBook : b))
      );
      setEditBook(null);
    } catch (err) {
      console.log(err);
      alert("Failed to update book");
    }
  };

  // Delete handlers
  const handleDelete = (book) => setDeleteBook(book);
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${deleteBook._id}`);
      setBooks((prev) => prev.filter((b) => b._id !== deleteBook._id));
      setDeleteBook(null);
    } catch (err) {
      console.log(err);
      alert("Failed to delete book");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <Header
        onSearch={setSearchTerm}
        onGenreChange={setGenre}
        onStatusChange={setStatus}
        genre={genre}
        status={status}
      />
      <div className="flex flex-wrap -m-2">
        {currentBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
      {/* Edit Modal */}
      {editBook && (
        <EditBookModal
          book={editBook}
          onClose={() => setEditBook(null)}
          onSave={handleUpdateBook}
        />
      )}
      {/* Delete Modal */}
      {deleteBook && (
        <ConfirmDeleteModal
          book={deleteBook}
          onClose={() => setDeleteBook(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
