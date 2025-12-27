import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Star,
  Sparkles,
  ArrowRight,
  Clock,
  Users,
} from "lucide-react";
import { IoTrashBinSharp } from "react-icons/io5";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const IslamicPattern = () => (
  <div className="absolute inset-0 z-0 opacity-5">
    <div className="grid h-full grid-cols-8 gap-4">
      {[...Array(64)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-center text-emerald-600"
        >
          <Star className="w-4 h-4" />
        </div>
      ))}
    </div>
  </div>
);

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "Basic", // Set default value
    duration: "",
    thumbnail: null,
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // Mock token for demo - replace with actual localStorage.getItem("token")
      const token = "demo-token";
      const res = await fetch(`${BASE_URL}/admin/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
      // For demo purposes, set empty array
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      // Mock token for demo
      const token = "demo-token";
      const res = await fetch(`${BASE_URL}/admin/deleteCourse/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchCourses();
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    console.log("Form data before validation:", form);

    // Enhanced validation with detailed logging
    if (!form.title?.trim()) {
      setSubmitError("Title is required");
      console.log("Validation failed: Title is empty");
      return;
    }

    if (!form.thumbnail) {
      setSubmitError("Thumbnail image is required");
      console.log("Validation failed: No thumbnail selected");
      return;
    }

    if (!form.level?.trim()) {
      setSubmitError("Level is required");
      console.log("Validation failed: Level is empty");
      return;
    }

    if (!form.duration?.trim()) {
      setSubmitError("Duration is required");
      console.log("Validation failed: Duration is empty");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("description", form.description.trim());
    formData.append("thumbnail", form.thumbnail);
    formData.append("level", form.level.trim());
    formData.append("duration", form.duration.trim());

    // Log FormData contents for debugging
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      // Mock token for demo
      const token = "demo-token";

      console.log("Attempting to submit course...");

      const res = await fetch(`${BASE_URL}/admin/create-course`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type when using FormData - browser will set it automatically
        },
        body: formData,
      });

      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);

      if (res.ok) {
        const responseData = await res.json();
        console.log("Course created successfully:", responseData);

        setUploadProgress(100);
        setTimeout(async () => {
          await fetchCourses();
          setShowModal(false);
          setForm({
            title: "",
            description: "",
            thumbnail: null,
            level: "Basic",
            duration: "",
          });
          setIsUploading(false);
          setUploadProgress(0);
          setSubmitError("");
        }, 500);
      } else {
        // Get error details from response
        let errorMessage = "Failed to add course";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `HTTP ${res.status}: ${res.statusText}`;
        }

        console.error("Server error:", errorMessage);
        setSubmitError(errorMessage);
        setIsUploading(false);
        setUploadProgress(0);
      }
    } catch (err) {
      console.error("Network/fetch error:", err);
      setSubmitError(`Network error: ${err.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    }

    clearInterval(progressInterval);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Mock token check for demo
  const token = "demo-token";
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
          <p className="text-gray-600">No authentication token found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 ">
      <IslamicPattern />

      <div className="relative z-10 flex flex-col justify-between gap-5 mb-6 md:gap-0 md:items-center md:flex-row">
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div>
              <h2 className="text-xl font-bold text-transparent md:text-2xl bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text">
                Course Management
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className="w-4 h-4 text-green-500" />
                <p className="text-xs font-medium text-green-600 md:text-sm">
                  View Add and Delete Courses
                </p>
              </div>
            </div>
          </div>
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-2 text-xs font-bold text-white transition-all duration-300 transform shadow-lg md:py-3 md:text-sm rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:-translate-y-1 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          <span>Add New Course</span>
        </button>
      </div>

      <div className="relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="relative p-4 transition-shadow border shadow-lg bg-white/80 backdrop-blur-sm rounded-xl md:p-6 border-emerald-200/20"
              >
                <div className="mb-4 text-center">
                  <div className="h-32 mx-auto mb-2 rounded bg-emerald-100 animate-pulse"></div>
                  <div className="h-4 mb-2 rounded bg-emerald-100 animate-pulse"></div>
                  <div className="h-3 rounded bg-emerald-100 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="p-8 text-center bg-white shadow text-emerald-600 rounded-xl">
            No courses available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="relative z-10 px-6 py-6">
                  {/* Title with better typography */}
                  <div className="mb-2">
                    <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900 transition-colors line-clamp-2 group-hover:text-emerald-700">
                      {course.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-600 line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Enhanced Stats Section */}
                  <div className="py-2 mb-2 border rounded-xl bg-gradient-to-r from-emerald-50/60 to-teal-50/60 border-emerald-100/60">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                            Duration
                          </p>
                          <p className="text-xs font-bold text-gray-900">
                            {course.duration} months
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
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
                  <div className="flex items-center justify-between mb-5">
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
                    onClick={() => handleDeleteCourse(course._id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] w-full "
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 transition-opacity duration-300 -translate-x-full opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:opacity-100 group-hover:translate-x-full"></div>

                    <div className="relative flex items-center justify-center gap-2">
                      <IoTrashBinSharp className="w-3.5 h-3.5" />
                      <span> Delete</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                </div>

                {/* Hover gradient border effect */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-md p-6 mx-2 bg-white shadow-lg rounded-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
              disabled={isUploading}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="mb-4 text-xl font-semibold text-emerald-800">
              Add New Course
            </h3>

            {/* Error Message */}
            {submitError && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
                {submitError}
              </div>
            )}

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-700">
                    Uploading Course...
                  </span>
                  <span className="text-sm font-medium text-emerald-700">
                    {Math.round(uploadProgress)}%
                  </span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium text-emerald-700">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  disabled={isUploading}
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-emerald-700">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows="3"
                  className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={isUploading}
                  placeholder="Enter course description"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-emerald-700">
                  Difficulty Level *
                </label>
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={isUploading}
                >
                  <option value="">Select Level</option>
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-emerald-700">
                  Course Duration (in months) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={isUploading}
                  placeholder="e.g., 6"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-emerald-700">
                  Thumbnail Image *
                </label>

                <label className="flex items-center justify-center w-full px-3 py-2 text-sm border rounded-lg cursor-pointer border-emerald-200">
                  <span className="text-gray-600">
                    {form.thumbnail ? form.thumbnail.name : "Choose an image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({ ...form, thumbnail: e.target.files[0] })
                    }
                    className="hidden"
                    required
                    disabled={isUploading}
                  />
                </label>

                {form.thumbnail && (
                  <p className="mt-1 text-xs text-gray-600">
                    Selected: {form.thumbnail.name}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSubmitError("");
                  }}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
