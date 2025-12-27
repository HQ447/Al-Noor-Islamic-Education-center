import React, { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  UserCheck,
  Settings,
  BarChart3,
  Search,
  Plus,
  Trash2,
  Check,
  Sparkles,
  X,
  Upload,
  Edit,
  Moon,
  Star,
} from "lucide-react";
import { NavLink } from "react-router";
import NotFound from "../main/Not Found/NotFound";

// Islamic Pattern Component
const IslamicPattern = () => (
  <div className="absolute inset-0 opacity-5">
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

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    pendingStudents: 0,
    registeredStudents: 0,
    totalCourses: 0,
    totalAdmins: 0,
  });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role"); // assuming role is stored

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const studentsEndpoint =
          role === "superadmin"
            ? `${BASE_URL}/super/getAllStudents`
            : `${BASE_URL}/admin/students`;

        // Fetch all data concurrently with role-based endpoint
        const [studentsResponse, coursesResponse, adminsResponse] =
          await Promise.all([
            fetch(studentsEndpoint, { headers }),
            fetch(`${BASE_URL}/admin/courses`, { headers }),
            fetch(`${BASE_URL}/admin/getAdmins`, { headers }),
          ]);

        const studentsData = await studentsResponse.json();
        const coursesData = await coursesResponse.json();
        const adminsData = await adminsResponse.json();

        console.log("Students API response:", studentsData);
        console.log("Courses API response:", coursesData);
        console.log("Admins API response:", adminsData);

        let allStudents = [];
        if (Array.isArray(studentsData)) {
          allStudents = studentsData;
        } else if (studentsData.data && Array.isArray(studentsData.data)) {
          allStudents = studentsData.data;
        } else if (
          studentsData.students &&
          Array.isArray(studentsData.students)
        ) {
          allStudents = studentsData.students;
        }

        let allCourses = [];
        if (Array.isArray(coursesData)) {
          allCourses = coursesData;
        } else if (coursesData.data && Array.isArray(coursesData.data)) {
          allCourses = coursesData.data;
        } else if (coursesData.courses && Array.isArray(coursesData.courses)) {
          allCourses = coursesData.courses;
        }

        let allAdmins = [];
        if (Array.isArray(adminsData)) {
          allAdmins = adminsData;
        } else if (adminsData.data && Array.isArray(adminsData.data)) {
          allAdmins = adminsData.data;
        } else if (adminsData.admins && Array.isArray(adminsData.admins)) {
          allAdmins = adminsData.admins;
        }

        const pendingStudents = allStudents.filter(
          (student) => student.status === "pending"
        ).length;
        const registeredStudents = allStudents.filter(
          (student) => student.status === "registered"
        ).length;

        setAnalytics({
          totalStudents: allStudents.length,
          pendingStudents,
          registeredStudents,
          totalCourses: allCourses.length,
          totalAdmins: allAdmins.length,
        });

        setStudents(allStudents);
        setCourses(allCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div
      className={`relative bg-gradient-to-br ${color} p-4 rounded-xl shadow-lg border border-emerald-200/20 overflow-hidden`}
    >
      <IslamicPattern />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white/90" />
          <span className="hidden text-xs text-white/70 font-arabic sm:block">
            بِسْمِ اللَّهِ
          </span>
        </div>
        <div className="mb-1 text-xl font-bold text-white md:text-2xl">
          {loading ? "..." : value}
        </div>
        <div className="text-xs text-white/80">{title}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold md:text-2xl text-emerald-800">
            Analytics Dashboard
          </h2>
          <p className="text-sm text-emerald-600">
            Loading your Islamic learning platform data...
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-3 lg:grid-cols-5 md:gap-4 md:mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-emerald-100 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!role) return <NotFound />;

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="relative mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div>
            <h2 className="text-xl font-bold text-transparent md:text-2xl bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text">
              Welcome {name.split(" ")[0]} !
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Sparkles className="w-4 h-4 text-green-500" />
              <p className="text-xs font-medium text-green-600 md:text-sm">
                {role == "admin"
                  ? "View and Manage Your Students Data"
                  : "View and Manage Overall Plateform Data"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6 md:grid-cols-3 lg:grid-cols-5 md:gap-4 md:mb-8">
        <StatCard
          title="Total Students"
          value={analytics.totalStudents}
          icon={Users}
          color="from-emerald-600 to-emerald-700"
        />
        <StatCard
          title="Pending Students"
          value={analytics.pendingStudents}
          icon={UserCheck}
          color="from-amber-500 to-amber-600"
        />
        <StatCard
          title="Registered Students"
          value={analytics.registeredStudents}
          icon={Check}
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="Total Courses"
          value={analytics.totalCourses}
          icon={BookOpen}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Admins"
          value={analytics.totalAdmins}
          icon={UserCheck}
          color="from-purple-500 to-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
        <div className="p-4 border shadow-lg bg-white/80 backdrop-blur-sm rounded-xl md:p-6 border-emerald-200/20">
          <h3 className="mb-4 text-base font-semibold md:text-lg text-emerald-800">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {students.slice(0, 5).map((student) => (
              <div
                key={student.id || student._id}
                className="flex items-center justify-between p-3 rounded-lg bg-emerald-50/50"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 overflow-hidden text-sm font-bold text-white rounded-full md:w-8 md:h-8 bg-gradient-to-br from-indigo-400 to-indigo-600">
                    {student?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">
                      {student.name || student.username || "Unknown Student"}
                    </p>
                    <p className="text-xs text-emerald-600">
                      Joined:{" "}
                      {student.joinDate || student.createdAt
                        ? new Date(
                            student.joinDate || student.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    student.status === "registered"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {student.status || "pending"}
                </span>
              </div>
            ))}
            {students.length === 0 && (
              <p className="py-4 text-sm text-center text-emerald-600">
                No students found
              </p>
            )}
          </div>
        </div>

        <div className="p-4 border shadow-lg bg-white/80 backdrop-blur-sm rounded-xl md:p-6 border-emerald-200/20">
          <h3 className="mb-4 text-base font-semibold md:text-lg text-emerald-800">
            Popular Courses
          </h3>
          <div className="space-y-3">
            {courses.slice(0, 4).map((course) => (
              <div
                key={course.id || course._id}
                className="flex items-center p-3 space-x-3 rounded-lg bg-emerald-50/50"
              >
                <div className="h-8 overflow-hidden rounded-md w-14">
                  <img src={course.thumbnail} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-emerald-800">
                    {course.title || course.name || "Untitled Course"}
                  </p>
                  <p className="text-xs truncate text-emerald-600">
                    {course.description || "No description available"}
                  </p>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="py-4 text-sm text-center text-emerald-600">
                No courses found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
