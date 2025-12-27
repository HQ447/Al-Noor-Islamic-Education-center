import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import {
  User,
  Mail,
  Award,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

function TeacherDetail() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const endpoint = `/super/getTeacher/${id}`;

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok) {
          throw new Error("Teacher not found");
        }

        const data = await response.json();
        setTeacher(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTeacher();
    }
  }, [id]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-emerald-600 bg-emerald-50";
      case "pending":
        return "text-amber-600 bg-amber-50";
      case "inactive":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "inactive":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading Component
  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-emerald-50 to-teal-50 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white shadow-xl rounded-2xl">
            <div className="animate-pulse">
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-emerald-100"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="w-3/4 h-8 rounded bg-emerald-100"></div>
                  <div className="w-1/2 h-4 rounded bg-emerald-100"></div>
                  <div className="w-2/3 h-4 rounded bg-emerald-100"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-20 rounded-lg bg-emerald-50"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error Component
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Teacher Not Found
          </h2>
          <p className="mb-6 text-gray-600">
            The teacher you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-7 bg-gradient-to-br from-emerald-50 to-teal-50 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-5 overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="relative px-8 py-6 bg-gradient-to-r bg-gray-50">
            <div className="absolute top-0 right-0 w-32 h-32 transition-opacity duration-300 pointer-events-none opacity-5 group-hover:opacity-10">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-indigo-600"
              >
                <circle cx="20" cy="20" r="4" fill="currentColor" />
                <circle cx="50" cy="20" r="4" fill="currentColor" />
                <circle cx="80" cy="20" r="4" fill="currentColor" />
                <circle cx="20" cy="50" r="4" fill="currentColor" />
                <circle cx="50" cy="50" r="6" fill="currentColor" />
                <circle cx="80" cy="50" r="4" fill="currentColor" />
                <circle cx="20" cy="80" r="4" fill="currentColor" />
                <circle cx="50" cy="80" r="4" fill="currentColor" />
                <circle cx="80" cy="80" r="4" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-2 md:gap-6 md:flex-row">
              {/* <div className="relative">
                <img
                  src={teacher?.img}
                  alt={teacher?.name}
                  className="object-cover border-4 border-white rounded-full shadow-lg w-22 h-22 md:w-32 md:h-32"
                />
              </div> */}
              <div className="p-1 transition-all duration-300 rounded-full group-hover:scale-105">
                
                <div className="">
                  {teacher.img ? (
                    <div className="p-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
                      <img
                        src={teacher.img}
                        alt={teacher.name}
                        className="object-cover w-20 h-20 transition-shadow rounded-full shadow-lg md:w-28 md:h-28 group-hover:shadow-xl"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-20 h-20 text-2xl font-bold text-white transition-shadow rounded-full shadow-lg md:w-26 md:h-26 bg-gradient-to-br from-green-500 to-emerald-600 group-hover:shadow-xl">
                      {teacher?.name?.charAt(0).toUpperCase() || "A"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col text-center md:text-left ">
                <h1 className="mb-2 text-2xl font-bold md:text-3xl">
                  {teacher?.name}
                </h1>
                <div className="flex flex-col items-center gap-2 md:items-start">
                  <div className="flex items-center px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md w-fit bg-gradient-to-r from-indigo-500 to-purple-600">
                    <Award className="w-3 h-3 mr-1" />
                    {teacher.designation || "Teacher"}
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold text-white rounded-full w-fit bg-gradient-to-r from-emerald-500 to-teal-600">
                    {teacher?.qualification || "Expert in Quranic Education"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Bio Section */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">About</h3>
            <p className="text-xs leading-relaxed text-gray-600">
              {teacher.bio ||
                "Dedicated to teaching the Quran with clarity and patience, guiding learners of all ages through personalized online sessions."}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Contact Information */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-800 md:text-lg">
              <Mail className="w-5 h-5 text-emerald-600" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Email:</span>
                <span className="text-sm font-medium text-gray-800">
                  {teacher?.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Contact:</span>
                <span className="text-sm font-medium text-gray-800 capitalize">
                  {teacher?.whatsapp || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-800 md:text-lg">
              <Award className="w-5 h-5 text-emerald-600" />
              Professional Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Experience:</span>
                <span className="text-sm font-medium text-gray-800">
                  {teacher?.experience} years
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Qualification:</span>
                <span className="text-sm font-medium text-gray-800">
                  {teacher?.qualification || "Expert in Islamic Education"}
                </span>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-800 md:text-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Status Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Account Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    teacher?.status
                  )}`}
                >
                  Registered
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Availability</span>
                <span className="text-sm font-medium text-gray-800 capitalize">
                  24/7 Available
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-800 md:text-lg">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Joined:</span>
                <span className="text-sm font-medium text-gray-800">
                  {formatDate(teacher?.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Last Updated:</span>
                <span className="text-sm font-medium text-gray-800">
                  {formatDate(teacher?.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
          <button className="px-8 py-3 text-xs font-medium text-white transition-colors rounded-lg shadow-lg bg-emerald-600 hover:bg-emerald-700">
            Contact Teacher
          </button>
          <button className="px-8 py-3 text-xs font-medium transition-colors bg-white border rounded-lg shadow-lg hover:bg-gray-50 text-emerald-600 border-emerald-600">
            View Classes
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
