import React, { useEffect, useState } from "react";
import {
  Book,
  Download,
  Eye,
  FileText,
  AlertCircle,
  Wifi,
  WifiOff,
} from "lucide-react";

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

const IslamicLibrary = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${BASE_URL}/api/books`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data.books || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError(
          "Unable to load books. Please check your internet connection."
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <section className="relative py-12 overflow-hidden text-white bg-gradient-to-r from-green-600 to-emerald-600">
        {/* Islamic Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M30 0l15 15-15 15-15-15zM0 30l15 15-15 15-15-15zM30 30l15 15-15 15-15-15zM60 30l15 15-15 15-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-6xl px-6 mx-auto text-center lg:px-12">
          <div className="mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-semibold text-black bg-white rounded-full bg-opacity-20">
              📚 Downloads
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
            Nourish Your Soul with
            <span className="block text-yellow-300">
              Authentic Islamic Texts
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm leading-relaxed text-green-100 md:text-lg ">
            Explore our collection of sacred Islamic books available for free
            download.
          </p>
        </div>
      </section>

      <div className="container px-8 py-8 mx-auto md:px-12">
        {/* Loading State with Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <BookSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-red-100 to-red-200">
              <WifiOff className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-800">
              Connection Error
            </h3>
            <p className="max-w-md mb-6 text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
            >
              <Wifi className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        {/* No Books Found State */}
        {!loading && !error && books.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-green-200">
              <Book className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-800">
              No Books Found
            </h3>
            <p className="max-w-md text-gray-600">
              No Islamic books are currently available in our library. Please
              check back later.
            </p>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && books.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl group"
              >
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

                {/* Book Cover */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div>{book.title}</div>
                  <div>{book.author}</div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 opacity-0 bg-black/60 group-hover:opacity-100">
                    <a
                      href={book.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white transition-all rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      title="View PDF"
                    >
                      <Eye className="w-5 h-5" />
                    </a>
                    <a
                      href={book.pdf}
                      target="_blank"
                      download
                      className="p-2 text-white transition-all rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      title="Download PDF"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="mb-1 text-lg font-bold text-gray-800 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">{book.author}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={book.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-sm font-medium text-white transition-all duration-300 rounded-md bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </a>
                    <a
                      href={book.pdf}
                      target="_blank"
                      download
                      className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-sm font-medium text-white transition-all duration-300 rounded-md bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IslamicLibrary;
