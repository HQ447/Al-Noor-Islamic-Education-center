import React, { useState, useEffect } from "react";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Users,
  Star,
  AlertCircle,
  Wifi,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// Skeleton Loader Component
const CourseSkeleton = () => (
  <div className="relative overflow-hidden transition-all duration-500 border shadow-xl bg-gradient-to-br from-white via-emerald-50/30 to-white backdrop-blur-sm rounded-2xl border-emerald-200/40">
    {/* Image Skeleton */}
    <div className="relative h-52 bg-gradient-to-r from-emerald-50 via-emerald-50 to-emerald-50 animate-pulse">
      <div className="absolute top-4 left-4">
        <div className="w-20 h-6 rounded-full bg-emerald-100 animate-pulse"></div>
      </div>
      <div className="absolute top-4 right-4">
        <div className="w-12 h-6 rounded-full bg-emerald-100 animate-pulse"></div>
      </div>
      <div className="absolute bottom-4 left-4">
        <div className="w-24 h-5 rounded-md bg-emerald-100 animate-pulse"></div>
      </div>
    </div>

    {/* Content Skeleton */}
    <div className="relative z-10 px-6 py-6">
      {/* Title and Description */}
      <div className="mb-2">
        <div className="w-3/4 h-6 mb-2 rounded bg-emerald-100 animate-pulse"></div>
        <div className="w-full h-4 mb-1 rounded bg-emerald-100 animate-pulse"></div>
        <div className="w-2/3 h-4 rounded bg-emerald-100 animate-pulse"></div>
      </div>

      {/* Stats Section */}
      <div className="py-2 my-3 border rounded-xl bg-gradient-to-r from-emerald-50/60 to-teal-50/60 border-emerald-100/60">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 animate-pulse"></div>
            <div>
              <div className="w-12 h-3 mb-1 rounded bg-emerald-100 animate-pulse"></div>
              <div className="w-16 h-3 rounded bg-emerald-100 animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 animate-pulse"></div>
            <div>
              <div className="w-12 h-3 mb-1 rounded bg-emerald-100 animate-pulse"></div>
              <div className="w-16 h-3 rounded bg-emerald-100 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex items-center justify-between my-3">
        <div className="text-right">
          <div className="w-16 h-3 mb-1 rounded bg-emerald-100 animate-pulse"></div>
          <div className="w-20 h-3 rounded bg-emerald-100 animate-pulse"></div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="w-full h-10 bg-emerald-100 rounded-xl animate-pulse"></div>
    </div>

    {/* Footer badges */}
    <div className="mb-3 border-t border-emerald-100/60">
      <div className="flex items-center justify-center gap-4 pt-3">
        <div className="w-16 h-3 rounded bg-emerald-100 animate-pulse"></div>
        <div className="w-20 h-3 rounded bg-emerald-100 animate-pulse"></div>
        <div className="w-20 h-3 rounded bg-emerald-100 animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ error, onRetry }) => {
  const isNetworkError =
    error?.code === "NETWORK_ERROR" ||
    error?.message?.includes("Network Error") ||
    !navigator.onLine;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex items-center justify-center w-20 h-20 mb-6 bg-red-100 rounded-full">
        {isNetworkError ? (
          <Wifi className="w-10 h-10 text-red-500" />
        ) : (
          <AlertCircle className="w-10 h-10 text-red-500" />
        )}
      </div>

      <h3 className="mb-2 text-xl font-bold text-gray-800">
        {isNetworkError ? "Connection Problem" : "Something went wrong"}
      </h3>

      <p className="max-w-md mb-6 text-gray-600">
        {isNetworkError
          ? "Please check your internet connection and try again."
          : "We encountered an error while loading the courses. Please try again."}
      </p>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 rounded-lg shadow-md bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="flex items-center justify-center w-20 h-20 mb-6 bg-gray-100 rounded-full">
      <BookOpen className="w-10 h-10 text-gray-400" />
    </div>

    <h3 className="mb-2 text-xl font-bold text-gray-800">No Courses Found</h3>

    <p className="max-w-md mb-6 text-gray-600">
      We don't have any courses available at the moment. Please check back later
      or contact us for more information.
    </p>

    <NavLink
      to="/contact"
      className="px-6 py-3 font-semibold text-white transition-all duration-200 rounded-lg shadow-md bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg"
    >
      Contact Us
    </NavLink>
  </div>
);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}/admin/courses`, {
        timeout: 10000, // 10 second timeout
      });

      setCourses(res.data || []); // Ensure we have an array
    } catch (err) {
      console.error("Failed to fetch courses", err);

      // Determine error type
      if (!navigator.onLine) {
        setError({ code: "NETWORK_ERROR", message: "No internet connection" });
      } else if (
        err.code === "ECONNABORTED" ||
        err.message.includes("timeout")
      ) {
        setError({ code: "TIMEOUT_ERROR", message: "Request timeout" });
      } else if (err.response?.status >= 500) {
        setError({ code: "SERVER_ERROR", message: "Server error" });
      } else {
        setError({
          code: "UNKNOWN_ERROR",
          message: err.message || "Unknown error occurred",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLearnMore = (id) => {
    navigate(`/course-detail/${id}`);
  };

  const handleRetry = () => {
    fetchCourses();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden text-white bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M30 0l15 15-15 15-15-15zM0 30l15 15-15 15-15-15zM30 30l15 15-15 15-15-15zM60 30l15 15-15 15-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative max-w-6xl px-6 mx-auto text-center lg:px-12">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-white rounded-full bg-opacity-20">
              📚 Islamic Courses
            </div>
          </div>
          <h1 className="mb-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
            Expand Your Knowledge Through
            <span className="block text-yellow-300">Expert-Led Courses</span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm leading-relaxed text-green-100 md:text-xl">
            Deepen your understanding of Islam with comprehensive courses taught
            by qualified scholars
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-8 bg-white ">
        <div className="max-w-6xl px-6 mx-auto lg:px-12">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              🎓 Available Courses
            </div>
            <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl lg:text-3xl">
              Choose Your Learning Path
            </h2>
            <p className="max-w-2xl mx-auto text-xs text-gray-600 md:text-sm">
              Select from our comprehensive range of Islamic courses designed
              for all levels
            </p>
          </div>

          {/* Courses Grid */}
          {loading ? (
            // Loading Skeleton
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <CourseSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            // Error State
            <ErrorMessage error={error} onRetry={handleRetry} />
          ) : courses.length === 0 ? (
            // Empty State
            <EmptyState />
          ) : (
            // Courses Grid
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="relative overflow-hidden transition-all duration-500 transform border shadow-xl bg-gradient-to-br from-white via-emerald-50/30 to-white backdrop-blur-sm rounded-2xl border-emerald-200/40 hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-300/60 group"
                >
                  {/* Decorative Islamic geometric pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 transition-opacity duration-300 pointer-events-none opacity-5 group-hover:opacity-10">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full text-emerald-500"
                    >
                      <circle cx="50" cy="25" r="6" fill="currentColor" />
                      <circle cx="50" cy="50" r="8" fill="currentColor" />
                      <circle cx="50" cy="75" r="6" fill="currentColor" />
                      <circle cx="25" cy="37.5" r="4" fill="currentColor" />
                      <circle cx="75" cy="37.5" r="4" fill="currentColor" />
                      <circle cx="25" cy="62.5" r="4" fill="currentColor" />
                      <circle cx="75" cy="62.5" r="4" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Enhanced Image Section */}
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay with better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Enhanced level badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 backdrop-blur-sm">
                        <span className="mr-1">📚</span>
                        {course.level || "Intermediate"}
                      </span>
                    </div>

                    {/* Enhanced rating badge */}
                    <div className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg top-4 right-4 bg-white/95 backdrop-blur-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                      <span className="text-xs font-bold text-gray-800">
                        {course.rating || "5.0"}
                      </span>
                    </div>

                    {/* Course category overlay */}
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-emerald-100 rounded-md bg-emerald-800/80 backdrop-blur-sm">
                        🕌 Quranic Studies
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Content Section */}
                  <div className="relative z-10 px-4 py-6">
                    {/* Title with better typography */}
                    <div className="mb-2">
                      <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900 transition-colors line-clamp-1 hover:line-clamp-2 group-hover:text-emerald-700">
                        {course.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-600 line-clamp-3">
                        {course.description}
                      </p>
                    </div>

                    {/* Enhanced Stats Section */}
                    <div className="py-2 my-3 border rounded-xl bg-gradient-to-r from-emerald-50/60 to-teal-50/60 border-emerald-100/60">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center rounded-full w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
                              Duration
                            </p>
                            <p className="text-xs font-bold text-gray-900">
                              {course.duration} months
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center rounded-full w-7 h-7 bg-gradient-to-br from-purple-500 to-purple-600">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
                              Students
                            </p>
                            <p className="text-xs font-bold text-gray-900">
                              {course.students?.toLocaleString() || "423"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Price Section */}
                    <div className="flex items-center justify-between my-3">
                      <div className="text-right">
                        <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                          Course Fee
                        </p>
                        <p className="text-xs font-semibold text-emerald-600">
                          💰 Best Value
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Action Button */}
                    <button
                      onClick={() => handleLearnMore(course._id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white transition-all duration-200 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-md hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] w-full "
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 transition-opacity duration-300 -translate-x-full opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:opacity-100 group-hover:translate-x-full"></div>

                      <div className="relative flex items-center justify-center gap-2">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  </div>
                  <div className="px-4 mb-3 border-t border-emerald-100/60">
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Certificate
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Live Classes
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Expert Teacher
                      </span>
                    </div>
                  </div>
                  {/* Hover gradient border effect */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 group-hover:opacity-100"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-white bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl px-6 mx-auto text-center lg:px-12">
          <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
            Ready to Begin Your Learning Journey?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-sm text-green-100 md:text-lg">
            Join thousands of students worldwide in deepening their
            understanding of Islam
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <NavLink
              to={"/register-student"}
              className="px-6 py-3 font-semibold  text-green-600 transition-colors bg-white rounded-lg shadow-lg hover:bg-gray-100"
            >
              Start Free Trial
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
