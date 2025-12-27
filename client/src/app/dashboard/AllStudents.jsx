import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  UserCheck,
  Settings,
  BarChart3,
  Search,
  Sparkles,
  Plus,
  Trash2,
  Check,
  X,
  Upload,
  Edit,
  Moon,
  Star,
  Grid,
  Table,
} from "lucide-react";
import { FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Islamic Pattern Component
const IslamicPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-5">
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

// Skeleton Loading Components
const TableSkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-8 h-8 mr-3 rounded-full bg-emerald-200"></div>
        <div className="min-w-0">
          <div className="w-24 h-4 mb-1 rounded bg-emerald-200"></div>
          <div className="w-20 h-3 rounded bg-emerald-100 sm:hidden"></div>
        </div>
      </div>
    </td>
    <td className="hidden px-3 py-4 md:px-6 whitespace-nowrap sm:table-cell">
      <div className="w-32 h-4 rounded bg-emerald-200"></div>
    </td>
    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
      <div className="w-16 h-6 rounded-full bg-emerald-200"></div>
    </td>
    <td className="hidden px-3 py-4 md:px-6 whitespace-nowrap md:table-cell">
      <div className="w-24 h-4 rounded bg-emerald-200"></div>
    </td>
    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
      <div className="flex gap-2">
        <div className="w-16 h-6 rounded bg-emerald-200"></div>
        <div className="w-6 h-6 rounded bg-emerald-200"></div>
        <div className="w-6 h-6 rounded bg-emerald-200"></div>
      </div>
    </td>
  </tr>
);

const GridSkeletonCard = () => (
  <div className="relative overflow-hidden border shadow-lg border-emerald-200/30 bg-gradient-to-br from-emerald-50/90 via-white/95 to-teal-50/90 backdrop-blur-sm rounded-2xl animate-pulse">
    <div className="relative p-5">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full bg-emerald-200 ring-4 ring-emerald-100"></div>
          <div className="absolute w-5 h-5 rounded-full -bottom-1 -right-1 bg-emerald-200"></div>
        </div>
        <div className="text-center">
          <div className="w-24 h-4 mb-2 rounded bg-emerald-200"></div>
          <div className="w-32 h-3 mb-2 rounded bg-emerald-100"></div>
          <div className="w-20 h-6 rounded-full bg-emerald-200"></div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mb-5 space-y-3">
        <div className="p-3 border rounded-xl bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-emerald-100/50">
          <div className="grid grid-cols-1 gap-2.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="w-16 h-3 rounded bg-emerald-200"></div>
                <div className="w-20 h-3 rounded bg-emerald-100"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="w-full h-10 rounded-xl bg-emerald-200"></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 rounded-xl bg-emerald-200"></div>
          <div className="h-10 rounded-xl bg-emerald-200"></div>
        </div>
      </div>
    </div>
  </div>
);

const AllStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deletingStudents, setDeletingStudents] = useState(new Set());

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/super/getAllStudents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const result = await response.json();
      const studentList = Array.isArray(result)
        ? result
        : result.students || [];
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
      // For demo purposes, set some mock data
      setTimeout(() => {
        setStudents([
          {
            _id: "1",
            name: "Ahmed Hassan",
            email: "ahmed@example.com",
            status: "registered",
            country: "Pakistan",
            course: "Quran Recitation",
            teacherName: "Hafiz Muhammad",
            whatsapp: "+923001234567",
            joinDate: new Date().toISOString(),
            feeStatus: "paid",
          },
          {
            _id: "2",
            name: "Fatima Ali",
            email: "fatima@example.com",
            status: "pending",
            country: "Bangladesh",
            course: "Arabic Grammar",
            teacherName: "Ustadha Aisha",
            whatsapp: "+880123456789",
            joinDate: new Date().toISOString(),
            feeStatus: "pending",
          },
          {
            _id: "3",
            name: "Omar Khan",
            email: "omar@example.com",
            status: "registered",
            country: "India",
            course: "Islamic Studies",
            teacherName: "Sheikh Ibrahim",
            whatsapp: "+919876543210",
            joinDate: new Date().toISOString(),
            feeStatus: "paid",
          },
        ]);
      }, 2000);
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);





  const handleApprove = async (studentId) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/updateStatus/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "registered" }),
      });

      if (res.ok) {
        setStudents((prev) =>
          prev.map((student) =>
            student._id === studentId || student.id === studentId
              ? { ...student, status: "registered" }
              : student
          )
        );
      } else {
        console.error("Failed to update student status");
      }
    } catch (error) {
      console.error("Error updating student status:", error);
      // For demo, still update locally
      setStudents((prev) =>
        prev.map((student) =>
          student._id === studentId || student.id === studentId
            ? { ...student, status: "registered" }
            : student
        )
      );
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      // Add student to deleting set
      setDeletingStudents((prev) => new Set(prev).add(studentId));

      const res = await fetch(`${BASE_URL}/admin/deleteStudent/${studentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Simulate some delay for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (res.ok) {
        setStudents((prev) =>
          prev.filter((student) => student._id !== studentId)
        );
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      // For demo, still delete locally
      setStudents((prev) =>
        prev.filter((student) => student._id !== studentId)
      );
    } finally {
      // Remove student from deleting set
      setDeletingStudents((prev) => {
        const newSet = new Set(prev);
        newSet.delete(studentId);
        return newSet;
      });
    }
  };

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const handleViewToggle = () => {
    setViewMode((prev) => (prev === "table" ? "grid" : "table"));
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (student.status &&
        student.status.toLowerCase() === statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });


 const exportToExcel = (data) => {
  // Map data and format joinDate
  const formattedData = data.map((item) => ({
    Name: item.name,
    Email: item.email,
    Country: item.country,
    Course: item.course,
    Role: item.role,
    Status: item.status,
    "Fee Status": item.feeStatus,
    "Join Date": new Date(item.joinDate).toISOString().split("T")[0],
    WhatsApp: item.whatsapp,
    Teacher: item.teacherName,
  }));

  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Auto-adjust column widths
  const columnWidths = Object.keys(formattedData[0]).map((key) => ({
    wch: Math.max(
      key.length,
      ...formattedData.map((row) => (row[key] ? row[key].toString().length : 0))
    ) + 2, // +2 for padding
  }));
  worksheet["!cols"] = columnWidths;

  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  // Export
  XLSX.writeFile(workbook, "students.xlsx");
};

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <IslamicPattern />
      <div className="flex flex-col mb-6 space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div>
              <h2 className="text-xl font-bold text-transparent md:text-2xl bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text">
                All Students
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className="w-4 h-4 text-green-500" />
                <p className="text-xs font-medium text-green-600 md:text-sm">
                  Manage all Students Registration and Approval
                </p>
              </div>
            </div>
          </div>
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                statusFilter === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("registered")}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                statusFilter === "registered"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-200"
              }`}
            >
              Registered
            </button>
            <button
              onClick={() => {
                console.log("click");
                handleFilterChange("pending");
              }}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                statusFilter === "pending"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => {
                exportToExcel(students)
              }}
              className={`px-3 py-2 flex justify-center items-center text-sm rounded-lg transition-colors bg-emerald-700 text-white`}
            >
              <FaFileDownload className="w-4 h-4 mr-2" /> Export
            </button>
          </div>
          <div className="relative">
            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-emerald-500" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 md:w-auto"
            />
          </div>
          <button
            onClick={handleViewToggle}
            className="flex items-center px-3 py-2 text-sm transition-colors rounded-lg text-emerald-800 bg-emerald-100 hover:bg-emerald-200"
          >
            {viewMode === "table" ? (
              <>
                <Grid className="w-4 h-4 mr-2" />
                Grid View
              </>
            ) : (
              <>
                <Table className="w-4 h-4 mr-2" />
                Table View
              </>
            )}
          </button>
        </div>
      </div>

      {loading ? (
        // Loading State
        viewMode === "table" ? (
          <div className="overflow-hidden border shadow-lg bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 backdrop-blur-sm rounded-xl border-emerald-200/20">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-emerald-100/50">
                  <tr>
                    <th className="px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800">
                      Student
                    </th>
                    <th className="hidden px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800 sm:table-cell">
                      Email
                    </th>
                    <th className="px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800">
                      Status
                    </th>
                    <th className="hidden px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800 md:table-cell">
                      Join Date
                    </th>
                    <th className="px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {[...Array(5)].map((_, i) => (
                    <TableSkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <GridSkeletonCard key={i} />
            ))}
          </div>
        )
      ) : filteredStudents.length === 0 ? (
        // No Students Found State
        <div className="p-12 text-center border shadow-lg bg-gradient-to-br from-emerald-50/90 via-white/95 to-teal-50/90 backdrop-blur-sm rounded-2xl border-emerald-200/30">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200">
              <Users className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-emerald-800">
            No Students Found
          </h3>
          <p className="text-sm text-emerald-600">
            {searchTerm || statusFilter !== "all"
              ? "No students match your current filters. Try adjusting your search criteria."
              : "No students have been registered yet. Students will appear here once they register."}
          </p>
        </div>
      ) : viewMode === "table" ? (
        // Table View
        <div className="overflow-hidden border shadow-lg bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 backdrop-blur-sm rounded-xl border-emerald-200/20">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-emerald-100/50">
                <tr>
                  <th className="px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800">
                    Student
                  </th>
                  <th className="hidden px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800 sm:table-cell">
                    Email
                  </th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800">
                    Status
                  </th>
                  <th className="hidden px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800 md:table-cell">
                    Join Date
                  </th>
                  <th className="px-3 py-3 text-xs font-medium tracking-wider text-left uppercase md:px-6 text-emerald-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id || student.id}
                    className="transition-colors hover:bg-emerald-50/30"
                  >
                    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-xs font-semibold text-white rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600">
                          {student.name?.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate text-emerald-800">
                            {student.name}
                          </div>
                          <div className="text-xs truncate text-emerald-600 sm:hidden">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-3 py-4 text-sm md:px-6 whitespace-nowrap text-emerald-600 sm:table-cell">
                      {student.email}
                    </td>
                    <td className="px-3 py-4 md:px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex capitalize px-2 py-1 text-xs font-semibold rounded-full ${
                          student.status?.toLowerCase() === "registered"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="hidden px-3 py-4 text-sm md:px-6 whitespace-nowrap text-emerald-600 md:table-cell">
                      {student.joinDate
                        ? new Date(student.joinDate).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "N/A"}
                    </td>
                    <td className="flex gap-2 px-3 py-4 text-sm font-medium md:px-6 whitespace-nowrap">
                      {student.status?.toLowerCase() === "pending" && (
                        <button
                          onClick={() =>
                            handleApprove(student._id || student.id)
                          }
                          className="flex items-center px-2 py-1 space-x-1 text-xs text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 md:px-3"
                        >
                          <UserCheck className="w-3 h-3" />
                          <span className="hidden sm:inline">Approve</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteStudent(student._id)}
                        disabled={deletingStudents.has(student._id)}
                        className="flex items-center justify-center w-8 h-8 text-red-600 transition-all rounded-lg bg-red-50 hover:bg-red-100 hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingStudents.has(student._id) ? (
                          <div className="w-4 h-4 border-2 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={`https://wa.me/${student.whatsapp}?text=Assalam O Alikum ! Welcome to Noor ul Quran , How can we Help you?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 text-green-600 transition-all rounded-lg bg-green-50 hover:bg-green-100 hover:scale-95"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStudents.map((student) => (
            <div
              key={student._id || student.id}
              className="relative overflow-hidden transition-all duration-300 transform border border-emerald-200/30 shadow-lg bg-gradient-to-br from-emerald-50/90 via-white/95 to-teal-50/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:scale-[1.02] hover:border-emerald-300/50 group"
            >
              {/* Decorative Islamic Pattern Overlay */}
              <div className="absolute top-0 right-0 w-20 h-20 transition-opacity duration-300 opacity-5 group-hover:opacity-10">
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

              <div className="relative p-5">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-3">
                    <div className="flex items-center justify-center w-16 h-16 text-lg font-bold text-white rounded-full shadow-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 ring-4 ring-emerald-100">
                      {student.name?.charAt(0)}
                    </div>
                    {/* Status indicator dot */}
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm ${
                        student.status === "registered"
                          ? "bg-green-500"
                          : "bg-amber-500"
                      }`}
                    >
                      <div
                        className={`w-full h-full rounded-full animate-pulse ${
                          student.status === "registered"
                            ? "bg-green-400"
                            : "bg-amber-400"
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="mb-1 text-base font-semibold leading-tight text-emerald-900">
                      {student.name}
                    </h3>
                    <p className="mb-2 text-sm text-emerald-700/80">
                      {student.email}
                    </p>
                    <span
                      className={`inline-flex items-center px-3 py-1.5 text-[9px] md:text-[10px] font-semibold rounded-full shadow-sm ${
                        student.status === "registered"
                          ? "text-emerald-800 bg-emerald-100 border border-emerald-200"
                          : "text-amber-800 bg-amber-100 border border-amber-200"
                      }`}
                    >
                      {student.status === "registered"
                        ? "✔️ Registered"
                        : "⏱ Pending"}
                    </span>
                  </div>
                </div>

                {/* Information Section */}
                <div className="mb-5 space-y-3">
                  <div className="p-3 border rounded-xl bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-emerald-100/50">
                    <div className="grid grid-cols-1 gap-2.5 text-xs md:text-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <span className="text-emerald-600">🌎</span>
                          Country
                        </span>
                        <span className="font-medium text-right text-emerald-900">
                          {student.country}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <span className="text-emerald-600">📚</span>
                          Course
                        </span>
                        <span
                          className="font-medium text-right text-emerald-900 line-clamp-1"
                          title={student.course}
                        >
                          {student.course}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <span className="text-emerald-600">👨‍🏫</span>
                          Teacher
                        </span>
                        <span className="font-medium text-right text-emerald-900">
                          {student.teacherName}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <span className="text-emerald-600">📞</span>
                          Contact
                        </span>
                        <span className="font-medium text-right text-emerald-900">
                          {student.whatsapp}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <span className="text-emerald-600">📅</span>
                          Joined
                        </span>
                        <span className="font-medium text-right text-emerald-900">
                          {student.joinDate
                            ? new Date(student.joinDate).toLocaleString(
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

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <span className="text-emerald-600">💲</span>
                          Fee Status
                        </span>
                        <span
                          className={`text-right font-semibold capitalize px-2 py-0.5 rounded-md text-xs ${
                            student.feeStatus?.toLowerCase() === "paid"
                              ? "text-emerald-800 bg-emerald-100"
                              : student.feeStatus?.toLowerCase() === "pending"
                              ? "text-amber-800 bg-amber-100"
                              : "text-slate-800 bg-slate-100"
                          }`}
                        >
                          {student.feeStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {student.status?.toLowerCase() === "pending" && (
                    <button
                      onClick={() => handleApprove(student._id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-md hover:from-emerald-700 hover:to-emerald-800 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve Student</span>
                    </button>
                  )}
                  <button>
                    View Details
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/${student.whatsapp}?text=Assalam O Alikum ! Welcome to Noor ul Quran , How can we Help you?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white transition-all duration-200 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-md hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <svg
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z" />
                      </svg>
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() =>
                        handleDeleteStudent(student._id || student.id)
                      }
                      disabled={deletingStudents.has(student._id || student.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {deletingStudents.has(student._id || student.id) ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover gradient border effect */}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStudents;
