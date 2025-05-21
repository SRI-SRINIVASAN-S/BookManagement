const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center mt-4 space-x-2">
    <button
      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages || totalPages === 0}
    >
      Next
    </button>
  </div>
);

export default Pagination;
