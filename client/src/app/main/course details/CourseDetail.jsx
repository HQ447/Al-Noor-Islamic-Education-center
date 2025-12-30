import React, { useEffect, useState } from "react";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { useParams } from "react-router";

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [error, setError] = useState(null);

  // Simulate your existing logic
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Your existing fetchCourse logic goes here

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/admin/course/${id}`);
        const result = await res.json();
        if (res.ok) {
          setCourse(result.course);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setError("Failed to load course details. Please try again later.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  // Enhanced Loading Component
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Loading Hero Section */}
        <div className="relative px-4 py-20 sm:px-6 bg-gradient-to-r from-green-700 to-emerald-600">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 animate-pulse">
              <div className="w-3/4 h-8 mx-auto bg-green-600 rounded sm:h-12"></div>
              <div className="w-full h-4 bg-green-600 rounded"></div>
              <div className="w-5/6 h-4 mx-auto bg-green-600 rounded"></div>
            </div>
          </div>
        </div>
        {/* Loading Content */}
        <div className="max-w-5xl px-4 py-12 mx-auto sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="animate-pulse">
              <div className="w-full bg-gray-200 rounded-lg h-80"></div>
            </div>
            <div className="space-y-4 animate-pulse">
              <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/3 h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced Error Component
  if (error || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Course Not Found
          </h2>
          <p className="mb-6 text-gray-600">
            {error ||
              "The course you're looking for doesn't exist or has been removed."}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full px-6 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Enhanced Hero Section */}
      <div className="relative px-4 py-16 text-white sm:px-6 lg:px-8 sm:py-20 lg:py-24 bg-gradient-to-r from-green-700 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-2xl font-bold leading-tight sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
            {course.title}
          </h1>
          <p className="max-w-3xl mx-auto text-sm leading-relaxed text-green-100 sm:text-base md:text-lg lg:text-xl">
            {course.description}
          </p>
        </div>
      </div>

      {/* Enhanced Course Content - Fixed container width and overflow */}
      <div className="w-full max-w-5xl px-4 py-8 mx-auto sm:px-6 lg:px-8 sm:py-12 lg:py-16">
        <div className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Enhanced Course Image - Fixed width constraints */}
          <div className="order-2 w-full lg:order-1">
            <div className="w-full overflow-hidden shadow-xl rounded-xl sm:rounded-2xl group">
              <img
                src={course.thumbnail}
                alt={course.thumbnail}
                className="object-cover w-full h-64 transition-transform duration-300 sm:h-80 lg:h-96 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Enhanced Course Info - Fixed flex layout and responsive sizing */}
          <div className="order-1 w-full space-y-6 lg:order-2">
            {/* Stats Cards - Improved mobile layout */}
            <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="p-3 bg-white border border-green-100 rounded-lg shadow-md sm:p-4">
                <div className="flex items-center gap-2 mb-1 text-emerald-600">
                  <Clock className="flex-shrink-0 w-4 h-4" />
                  <span className="text-xs font-medium tracking-wide uppercase">
                    Duration
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  {course.duration} months
                </p>
              </div>

              <div className="p-3 bg-white border border-green-100 rounded-lg shadow-md sm:p-4">
                <div className="flex items-center gap-2 mb-1 text-emerald-600">
                  <Users className="flex-shrink-0 w-4 h-4" />
                  <span className="text-xs font-medium tracking-wide uppercase">
                    Students
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  {course.students || "232"}
                </p>
              </div>

              <div className="p-3 bg-white border border-green-100 rounded-lg shadow-md sm:p-4 xs:col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 mb-1 text-emerald-600">
                  <Star className="flex-shrink-0 w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium tracking-wide uppercase">
                    Rating
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  {course.rating || "4.98"}
                </p>
              </div>
            </div>

            {/* Course Details - Fixed content overflow */}
            <div className="w-full p-4 bg-white border border-green-100 shadow-lg rounded-xl sm:p-6">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800">
                <BookOpen className="flex-shrink-0 w-5 h-5 text-emerald-600" />
                Course Details
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="font-semibold text-gray-700 sm:min-w-20">
                    Level:
                  </span>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-800 w-fit">
                    {course.level}
                  </span>
                </div>

                {course.topics && course.topics.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-semibold text-gray-700">Topics:</span>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm text-gray-700 break-words bg-gray-100 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Enroll Button - Improved mobile spacing */}
            <div className="w-full p-4 text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl sm:p-6">
              <h3 className="mb-2 text-lg font-bold">
                Ready to Start Learning?
              </h3>
              <p className="mb-4 text-sm text-green-100">
                Join thousands of students in this comprehensive course.
              </p>
              <a
                href="/register-student"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all transform bg-white rounded-lg md:px-6 md:py-3 text-emerald-600 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1"
              >
                <CheckCircle className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5" />
                Enroll Now
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced Course Overview - Fixed width constraints */}
        {course.fullDescription && (
          <div className="w-full mt-12 lg:mt-16">
            <div className="w-full p-4 bg-white border border-green-100 shadow-xl rounded-2xl sm:p-6 lg:p-8">
              <h2 className="flex items-center gap-3 mb-6 text-xl font-bold sm:text-2xl lg:text-3xl text-emerald-700">
                <div className="flex-shrink-0 p-2 rounded-lg bg-emerald-100">
                  📖
                </div>
                <span className="break-words">Course Overview</span>
              </h2>
              <div className="w-full prose prose-gray max-w-none">
                <p className="text-sm leading-relaxed text-gray-700 break-words whitespace-pre-wrap sm:text-base">
                  {course.fullDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action Section - Fixed mobile layout */}
        <div className="w-full mt-12 text-center lg:mt-16">
          <div className="w-full p-6 text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl sm:p-8">
            <h3 className="mb-4 text-xl font-bold sm:text-2xl">
              Start Your Islamic Learning Journey Today
            </h3>
            <p className="max-w-2xl mx-auto mb-6 text-sm text-emerald-100 sm:text-base">
              Join our community of learners and deepen your understanding of
              Islamic teachings with expert guidance.
            </p>
            <a
              href="/register-student"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all transform bg-white text-emerald-600 rounded-xl hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1"
            >
              <CheckCircle className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6" />
              Begin Your Journey
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
