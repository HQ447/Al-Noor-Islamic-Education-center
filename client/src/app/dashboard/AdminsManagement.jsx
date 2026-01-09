import React, { useEffect, useState } from "react";
import { Star, Grid, Table, Sparkles, Users, Award } from "lucide-react";
import { IoTrashBinSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";

// Enhanced Islamic Pattern Component with animated elements
const IslamicPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-5">
    <div className="grid h-full grid-cols-12 gap-3">
      {[...Array(96)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-center text-green-400 animate-pulse"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <Star className="w-3 h-3" />
        </div>
      ))}
    </div>
    {/* Floating geometric shapes */}
    <div className="absolute w-20 h-20 border rounded-full top-10 left-10 border-green-300/20 animate-spin-slow"></div>
    <div className="absolute w-16 h-16 rotate-45 border top-32 right-16 border-green-400/20 animate-pulse"></div>
    <div className="absolute w-12 h-12 border rounded-full bottom-20 left-20 border-green-300/20 animate-bounce-slow"></div>
  </div>
);

// Floating particles background
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-green-200/30 animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${3 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ))}
  </div>
);

export const AdminsManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/getAdmins`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setAdmins(data.admins || []);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/deleteAdmin/${adminId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        fetchAdmins();
      } else {
        console.error("Failed to delete admin");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <IslamicPattern />
      <FloatingParticles />

      {/* Header with enhanced styling */}
      <div className="relative z-10 p-6">
        <div className="flex flex-col justify-between gap-6 mb-8 md:flex-row md:items-center">
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h2 className="text-xl font-bold text-transparent md:text-2xl bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text">
                  Admins & Teachers Management
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  <p className="text-xs font-medium text-green-600 md:text-sm">
                    Manage platform administrators & instructors
                  </p>
                </div>
              </div>
            </div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
          </div>

          <button
            onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
            className="flex items-center px-3 py-2 text-xs font-medium text-white transition-all duration-300 transform shadow-lg md:px-6 md:py-3 group rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl hover:-translate-y-1"
          >
            {viewMode === "table" ? (
              <>
                <Grid className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                Grid View
              </>
            ) : (
              <>
                <Table className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                Table View
              </>
            )}
          </button>
        </div>

        {viewMode === "table" ? (
          <div className="relative z-10 overflow-hidden border-2 shadow-2xl bg-white/90 backdrop-blur-lg rounded-2xl border-green-200/40">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/50"></div>
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gradient-to-r from-green-100 to-emerald-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-green-800 uppercase">
                      Administrator
                    </th>
                    <th className="hidden px-6 py-4 text-xs font-bold tracking-wider text-left text-green-800 uppercase sm:table-cell">
                      Email Address
                    </th>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-green-800 uppercase">
                      Role
                    </th>
                    <th className="hidden px-6 py-4 text-xs font-bold tracking-wider text-left text-green-800 uppercase md:table-cell">
                      Join Date
                    </th>
                    <th className="hidden px-6 py-4 text-xs font-bold tracking-wider text-left text-green-800 uppercase md:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-100/60">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-8 h-8 border-4 border-green-200 rounded-full border-t-green-600 animate-spin"></div>
                          <span className="ml-3 font-medium text-green-600">
                            Loading administrators...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : admins.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 font-medium text-center text-green-600"
                      >
                        No administrators found.
                      </td>
                    </tr>
                  ) : (
                    admins.map((admin) => (
                      <tr
                        key={admin._id}
                        className="transition-all duration-200 hover:bg-green-50/60 hover:shadow-md"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {admin.img ? (
                              <img
                                src={admin.img}
                                alt={admin.name}
                                className="object-cover w-12 h-12 mr-4 border-2 border-green-200 rounded-full shadow-md"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-12 h-12 mr-4 text-lg font-bold text-white rounded-full shadow-md bg-gradient-to-br from-green-500 to-emerald-600">
                                {admin?.name?.charAt(0).toUpperCase() || "A"}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-green-800">
                                {admin.name}
                              </div>
                              <div className="text-xs text-green-600 sm:hidden">
                                {admin.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-6 py-4 text-sm text-green-600 sm:table-cell whitespace-nowrap">
                          {admin.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-3 py-1 text-xs font-semibold text-purple-800 capitalize bg-purple-100 rounded-full">
                            {admin.role}
                          </span>
                        </td>
                        <td className="hidden px-6 py-4 text-sm text-green-600 md:table-cell whitespace-nowrap">
                          {admin.createdAt?.substring(0, 10) || "N/A"}
                        </td>
                        <td className="hidden px-6 py-4 text-sm text-green-600 md:table-cell whitespace-nowrap">
                          <IoTrashBinSharp
                            className="text-2xl text-red-500 transition-all cursor-pointer hover:text-red-600 hover:scale-110"
                            onClick={() => handleDeleteAdmin(admin._id)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className="relative p-6 transition-all duration-300 border shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl border-emerald-200/50 hover:shadow-2xl hover:-translate-y-1 hover:border-emerald-300/70 group"
              >
                {/* Decorative Islamic Pattern Overlay - Fixed z-index */}
                <div className="absolute top-0 right-0 w-20 h-20 transition-opacity duration-300 pointer-events-none opacity-5 group-hover:opacity-10">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-emerald-600"
                  >
                    <circle cx="50" cy="20" r="8" fill="currentColor" />
                    <circle cx="50" cy="50" r="12" fill="currentColor" />
                    <circle cx="50" cy="80" r="8" fill="currentColor" />
                    <circle cx="20" cy="35" r="6" fill="currentColor" />
                    <circle cx="80" cy="35" r="6" fill="currentColor" />
                    <circle cx="20" cy="65" r="6" fill="currentColor" />
                    <circle cx="80" cy="65" r="6" fill="currentColor" />
                  </svg>
                </div>

                {/* Role badge */}
                <div className="absolute z-20 px-3 py-1 text-xs font-bold text-white capitalize rounded-full shadow-md top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                  🔰{" "}
                  {admin.role === "admin"
                    ? "Teacher"
                    : admin.name == "Hamad Ahmad"
                    ? "Developer"
                    : "Director"}
                </div>

                {/* Main content with proper z-index */}
                <div className="relative z-10">
                  <div className="flex flex-col items-center mb-6">
                    <div className="mb-4">
                      {admin.img ? (
                        <img
                          src={admin.img}
                          alt={admin.name}
                          className="object-cover transition-shadow border-4 border-green-200 rounded-full shadow-lg w-18 h-18 md:w-20 md:h-20 group-hover:shadow-xl"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white transition-shadow rounded-full shadow-lg md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-600 group-hover:shadow-xl">
                          {admin?.name?.charAt(0).toUpperCase() || "A"}
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <h3 className="mb-1 text-lg font-bold text-green-800">
                        {admin.name === localStorage.getItem("name")
                          ? `${admin.name} (You)`
                          : admin.name}
                      </h3>
                      <p className="mb-3 text-sm text-green-600">
                        {admin.email}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 mb-2 text-xs font-semibold text-white rounded-full shadow-md bg-gradient-to-r from-indigo-500 to-purple-600">
                        <Award className="w-3 h-3 mr-1" />
                        {admin.designation || "Teacher"}
                      </div>
                      {admin.designation == "Software Engineer" && (
                        <div className="px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md bg-gradient-to-r from-yellow-500 to-orange-600">
                          🔰 Only you can see this profile
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Information Section with better visibility */}
                  <div className="mb-5 space-y-3">
                    <div className="p-4 border rounded-xl bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border-emerald-200/60">
                      <div className="grid grid-cols-1 gap-3 text-xs md:text-sm">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <span className="text-emerald-600">🌎</span>
                            Country
                          </span>
                          <span className="font-semibold text-right text-emerald-900">
                            {admin.country || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <span className="text-emerald-600">🎓</span>
                            Qualification
                          </span>
                          <span
                            className="font-semibold text-right text-emerald-900 line-clamp-1"
                            title={admin.qualification}
                          >
                            {admin.qualification || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <span className="text-emerald-600">👨‍🏫</span>
                            Experience
                          </span>
                          <span className="font-semibold text-right text-emerald-900">
                            {admin.experience || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <span className="text-emerald-600">📞</span>
                            Contact
                          </span>
                          <span className="font-semibold text-right text-emerald-900">
                            {admin.whatsapp || "87278328"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <span className="text-emerald-600">📅</span>
                            Joined
                          </span>
                          <span className="font-semibold text-right text-emerald-900">
                            {admin.createdAt
                              ? new Date(admin.createdAt).toLocaleString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons with proper z-index and contrast */}
                  <div className="relative z-20 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleDeleteAdmin(admin._id)}
                      className="flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold text-white transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <IoTrashBinSharp className="w-4 h-4" />
                      <span>Delete</span>
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/admin-dashboard/teacher-detail/${admin._id}`)
                      }
                      className="flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold text-white transition-all duration-200 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminsManagement;
