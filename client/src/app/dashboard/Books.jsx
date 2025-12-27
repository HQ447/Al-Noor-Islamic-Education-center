import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  FileText,
  Sparkles,
  Download,
  Eye,
  BookOpen,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Trash2 } from "lucide-react";

// Optimized Islamic Pattern Background Component
const IslamicPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-5">
    <div className="grid h-full grid-cols-8 gap-6">
      {[...Array(32)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-center text-emerald-400"
          style={{
            animation: `pulse 3s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <BookOpen className="w-4 h-4" />
        </div>
      ))}
    </div>
  </div>
);

// Loading Spinner Component
const LoadingSpinner = ({ size = "w-5 h-5" }) => (
  <Loader2 className={`${size} animate-spin`} />
);

// Progress Bar Component
const ProgressBar = ({ progress }) => (
  <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
    <div
      className="h-full transition-all duration-300 ease-out rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Error/Success Message Component
const Message = ({ type, message, onClose }) => {
  const isError = type === "error";

  return (
    <div
      className={`flex items-center gap-2 p-3 mb-4 rounded-xl border ${
        isError
          ? "bg-red-50 border-red-200 text-red-700"
          : "bg-green-50 border-green-200 text-green-700"
      }`}
    >
      {isError ? (
        <AlertCircle className="flex-shrink-0 w-4 h-4" />
      ) : (
        <CheckCircle className="flex-shrink-0 w-4 h-4" />
      )}
      <span className="flex-1 text-sm">{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Book Skeleton Loader Component
const BookSkeleton = () => (
  <div className="overflow-hidden bg-white rounded-lg shadow-lg animate-pulse">
    <div className="p-3 mb-4 border rounded-xl bg-gradient-to-r from-emerald-50/60 to-teal-50/60 border-emerald-100/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-emerald-100"></div>
          <div className="w-16 h-3 rounded bg-emerald-100"></div>
        </div>
        <div className="w-16 h-5 rounded-full bg-emerald-100"></div>
      </div>
    </div>

    <div className="relative h-48 bg-emerald-100"></div>

    <div className="p-4">
      <div className="mb-3">
        <div className="w-3/4 h-5 mb-2 rounded bg-emerald-100"></div>
        <div className="w-1/2 h-4 rounded bg-emerald-100"></div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 h-10 rounded-md bg-emerald-100"></div>
        <div className="flex-1 h-10 rounded-md bg-emerald-100"></div>
      </div>
    </div>
  </div>
);

const Books = () => {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    thumbnail: null,
    pdf: null,
  });

  // Loading states
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleting, setDeleting] = useState({});

  // Message states
  const [message, setMessage] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Show message helper
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/books`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setBooks(data.books || []);
        } else {
          showMessage("error", "Failed to fetch books");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        showMessage("error", "Network error occurred while fetching books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    setDeleting((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch(`${BASE_URL}/api/deleteBook/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        // Update books state to remove the deleted book
        setBooks((prevBooks) => {
          const updatedBooks = prevBooks.filter((book) => book._id !== id);
          console.log("Updated books state:", updatedBooks); // Debug: Verify books update
          return updatedBooks;
        });
        showMessage("success", "Book deleted successfully!");
      } else {
        console.error("Delete API error:", data);
        showMessage(
          "error",
          `Failed to delete book: ${data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Network error deleting book:", error);
      showMessage("error", "Network error occurred while deleting book");
    } finally {
      // Reset deleting state
      setDeleting((prev) => {
        const newState = { ...prev, [id]: false };
        console.log("Reset deleting state:", newState); // Debug: Verify reset
        return newState;
      });
    }
  };

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const handleSubmit = async () => {
    // Validate form
    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.thumbnail ||
      !newBook.pdf
    ) {
      showMessage("error", "Please fill in all required fields");
      return;
    }

    setUploading(true);

    // Start upload progress simulation
    const progressInterval = simulateUploadProgress();

    try {
      const formData = new FormData();
      formData.append("title", newBook.title);
      formData.append("author", newBook.author);
      formData.append("thumbnail", newBook.thumbnail);
      formData.append("pdf", newBook.pdf);

      const res = await fetch(`${BASE_URL}/api/add-book`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const result = await res.json();

      // Complete progress
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (res.ok) {
        setBooks((prev) => [...prev, result.book]);
        setModalOpen(false);
        setNewBook({
          title: "",
          author: "",
          description: "",
          thumbnail: null,
          pdf: null,
        });
        showMessage("success", "Book added successfully!");
      } else {
        showMessage("error", result.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      clearInterval(progressInterval);
      showMessage("error", "Network error occurred while adding book");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <IslamicPattern />

      {/* Header Section */}
      <div className="relative z-10 p-6">
        {/* Message Display */}
        {message && (
          <Message
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        )}

        <div className="flex flex-col justify-between gap-6 mb-8 md:flex-row md:items-center">
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h2 className="text-xl font-bold text-transparent md:text-2xl bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text">
                  Library Management
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <p className="text-xs font-medium text-emerald-600 md:text-base">
                    Manage Add/Drop Books
                  </p>
                </div>
              </div>
            </div>
            <div className="w-32 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"></div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            disabled={uploading}
            className="flex items-center justify-center gap-2 px-6 py-2 text-xs font-bold text-white transition-all duration-300 transform shadow-lg md:py-3 md:text-sm rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:-translate-y-1 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {uploading ? (
              <LoadingSpinner />
            ) : (
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            )}
            <span>Add New Book</span>
          </button>
        </div>

        {/* Loading State with Book Skeletons */}
        {loading ? (
          <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <BookSkeleton key={index} />
            ))}
          </div>
        ) : /* Books Grid */
        books.length === 0 ? (
          <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 text-center border shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl border-emerald-200/50">
            <div className="flex items-center justify-center mb-6 rounded-full w-17 h-17 bg-gradient-to-br from-emerald-100 to-teal-100">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-800">
              No Books Found
            </h3>
            <p className="max-w-md text-xs text-gray-600">
              Start building your digital library by adding your first book
              using the "Add New Book" button above.
            </p>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {books.map((book) => (
              <div
                key={book._id}
                className="relative overflow-hidden transition-all duration-500 transform border shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl border-emerald-200/50 hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-300/70 group"
              >
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-16 h-16 transition-opacity duration-300 pointer-events-none opacity-10 group-hover:opacity-20">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-emerald-500"
                  >
                    <circle cx="50" cy="20" r="6" fill="currentColor" />
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                    <circle cx="50" cy="80" r="6" fill="currentColor" />
                    <circle cx="20" cy="35" r="4" fill="currentColor" />
                    <circle cx="80" cy="35" r="4" fill="currentColor" />
                    <circle cx="20" cy="65" r="4" fill="currentColor" />
                    <circle cx="80" cy="65" r="4" fill="currentColor" />
                  </svg>
                </div>

                {/* Book Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="object-cover w-full transition-transform duration-500 h-50 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600">
                      📚 Islamic Book
                    </span>
                  </div>

                  {/* Delete Button with Loading */}
                  <div
                    onClick={() =>
                      !deleting[book._id] && handleDeleteBook(book._id)
                    }
                    className={`absolute p-2 bg-white rounded-md top-4 right-4 ${
                      deleting[book._id]
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:bg-red-50"
                    }`}
                  >
                    {deleting[book._id] ? (
                      <LoadingSpinner size="w-5 h-5" />
                    ) : (
                      <Trash2 className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>

                {/* Book Content */}
                <div className="relative z-10 px-4 py-3">
                  <div className="mb-2">
                    <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900 transition-colors line-clamp-2 group-hover:text-emerald-700">
                      {book.title}
                    </h3>
                    <p className="text-sm font-medium capitalize text-emerald-600">
                      by {book.author}
                    </p>
                  </div>

                  {/* Book Info */}
                  <div className="p-3 mb-4 border rounded-xl bg-gradient-to-r from-emerald-50/60 to-teal-50/60 border-emerald-100/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-medium text-emerald-700">
                        <FileText className="w-3 h-3" />
                        PDF Format
                      </span>
                      <span className="px-2 py-1 font-semibold rounded-full text-emerald-800 bg-emerald-100">
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={book.pdf}
                      download
                      target="_blank"
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:scale-105 active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                    <a
                      href={book.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white transition-all duration-200 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-md hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg transform hover:scale-105 active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View PDF</span>
                    </a>
                  </div>
                </div>

                {/* Hover gradient border effect */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative p-4 text-sm border shadow-2xl bg-white/95 backdrop-blur-lg rounded-2xl border-emerald-200/50">
              {/* Close Button */}
              <button
                onClick={() => !uploading && setModalOpen(false)}
                type="button"
                disabled={uploading}
                className="absolute p-2 text-gray-500 transition-colors rounded-full top-3 right-3 hover:text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-bold text-gray-900">
                    Add New Book
                  </h2>
                  {uploading && <LoadingSpinner />}
                </div>
                <p className="text-xs text-gray-600">
                  Fill in the details to add a new book to your library
                </p>
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-700">
                      Uploading...
                    </span>
                    <span className="text-sm text-emerald-600">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  <ProgressBar progress={uploadProgress} />
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Book Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter book title"
                    required
                    disabled={uploading}
                    className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-500 transition-colors border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    value={newBook.title}
                    onChange={(e) =>
                      setNewBook({ ...newBook, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">
                    Author *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter author name"
                    required
                    disabled={uploading}
                    className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-500 transition-colors border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    value={newBook.author}
                    onChange={(e) =>
                      setNewBook({ ...newBook, author: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="thumbnail-upload"
                    className="block mb-1 text-xs font-medium text-gray-700"
                  >
                    Book Thumbnail *
                  </label>
                  <input
                    id="thumbnail-upload"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    required
                    disabled={uploading}
                    className="w-full px-3 py-2 text-sm text-gray-900 transition-colors border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    onChange={(e) =>
                      setNewBook({ ...newBook, thumbnail: e.target.files[0] })
                    }
                    style={{
                      WebkitAppearance: "none",
                      appearance: "none",
                    }}
                  />
                  {newBook.thumbnail && (
                    <p className="mt-1 text-xs text-emerald-600">
                      Selected: {newBook.thumbnail.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pdf-upload"
                    className="block mb-1 text-xs font-medium text-gray-700"
                  >
                    PDF File *
                  </label>
                  <input
                    id="pdf-upload"
                    name="pdf"
                    type="file"
                    accept="application/pdf"
                    required
                    disabled={uploading}
                    className="w-full px-3 py-2 text-sm text-gray-900 transition-colors border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    onChange={(e) =>
                      setNewBook({ ...newBook, pdf: e.target.files[0] })
                    }
                    style={{
                      WebkitAppearance: "none",
                      appearance: "none",
                    }}
                  />
                  {newBook.pdf && (
                    <p className="mt-1 text-xs text-emerald-600">
                      Selected: {newBook.pdf.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={uploading}
                  className="flex-1 px-4 py-2 text-xs font-semibold text-gray-700 transition-all duration-200 transform bg-gray-100 rounded-xl hover:bg-gray-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={uploading}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {uploading ? (
                    <>
                      <LoadingSpinner />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <span>Add Book</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
