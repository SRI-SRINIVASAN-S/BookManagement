import BookCard from "../components/Ui/BookCard";
import Header from "../components/Ui/Header";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EditBookModal from "../components/modals/EditBookModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import AddBookModal from "../components/modals/AddBookModal";
import Pagination from "../components/Ui/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooksThunk,
  addBookThunk,
  updateBookThunk,
  deleteBookThunk,
} from "../store/features/books/booksThunks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PAGE_SIZE = 10;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: books, loading, error } = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All");
  const [status, setStatus] = useState("All");
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genre, status]);

  // Handlers
  const handleEdit = (book) => setEditBook(book);

  const handleUpdateBook = async (updatedBook) => {
    const res = await dispatch(updateBookThunk(updatedBook));
    if (res.type.endsWith("fulfilled")) {
      setEditBook(null);
      toast.success("Book updated successfully!");
    } else {
      toast.error("Failed to update book");
    }
  };

  const handleDelete = (book) => setDeleteBook(book);

  const handleConfirmDelete = async () => {
    const res = await dispatch(deleteBookThunk(deleteBook._id));
    if (res.type.endsWith("fulfilled")) {
      setDeleteBook(null);
      toast.success("Book deleted successfully!");
    } else {
      toast.error("Failed to delete book");
    }
  };

  const handleAddBook = async (newBook) => {
    const res = await dispatch(addBookThunk(newBook));
    if (res.type.endsWith("fulfilled")) {
      setAddModalOpen(false);
      toast.success("Book added successfully!");
    } else {
      toast.error("Failed to add book");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Header
        onSearch={setSearchTerm}
        onGenreChange={setGenre}
        onStatusChange={setStatus}
        genre={genre}
        status={status}
        onAddBook={() => setAddModalOpen(true)}
      />
      <div className="flex flex-wrap -m-2">
        {currentBooks.length === 0 && (
          <div className="w-full flex items-center justify-center py-20">
            <p className="text-2xl font-semibold text-gray-400">
              No books found
            </p>
          </div>
        )}
        {currentBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Edit book modal */}
      {editBook && (
        <EditBookModal
          book={editBook}
          onClose={() => setEditBook(null)}
          onSave={handleUpdateBook}
        />
      )}

      {/* Delete book modal */}
      {deleteBook && (
        <ConfirmDeleteModal
          book={deleteBook}
          onClose={() => setDeleteBook(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Add book modal */}
      {addModalOpen && (
        <AddBookModal
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddBook}
        />
      )}
    </div>
  );
};

export default Dashboard;
