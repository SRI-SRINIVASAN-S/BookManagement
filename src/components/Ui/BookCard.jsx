import { Edit, Delete } from "@mui/icons-material";

const BookCard = ({ book, onEdit, onDelete }) => {
  const { title, author, genre, publishedYear, status } = book;
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
      <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 h-full flex flex-col transition-transform hover:scale-105 relative">
        {/* Edit/Delete Icons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={() => onEdit(book)} aria-label="Edit">
            <Edit
              fontSize="small"
              className="text-blue-500 hover:text-blue-700"
            />
          </button>
          <button onClick={() => onDelete(book)} aria-label="Delete">
            <Delete
              fontSize="small"
              className="text-red-500 hover:text-red-700"
            />
          </button>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Author:</span> {author}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Genre:</span> {genre}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Published:</span> {publishedYear}
        </p>
        <p
          className={`mt-3 font-semibold ${
            status === "Issued" ? "text-red-500" : "text-green-600"
          }`}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
