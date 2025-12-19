import {
  Users,
  BookOpen,
  UserCheck,
  Settings,
  BarChart3,
  Moon,
  Star,
  Menu,
  X,
} from "lucide-react";
import { RiBookShelfLine } from "react-icons/ri";

import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

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

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const toggleSidebar = () => setIsOpen(!isOpen);
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      {/* Toggle Button - only on small screens */}
      <button
        className="fixed z-50 p-3 text-white rounded-md top-3 right-4 bg-emerald-700 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={17} /> : <Menu size={17} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 transform bg-gradient-to-b from-emerald-800 to-emerald-900 border-r border-emerald-700/50 shadow-xl w-64
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative  md:w-64`}
      >
        <div className="p-4 border-b border-emerald-700/50">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
              🕮
            </div>
            <div className="">
              <h1 className="text-lg font-bold text-white">Al Noor</h1>
              <p className="text-xs text-emerald-200">Dashboard Panel</p>
            </div>
          </div>
        </div>

        <nav className="px-2 mt-4">
          {/* Common Tabs */}
          <NavLink
            to=""
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-1 ${
              activeTab === ""
                ? "bg-emerald-700 text-white shadow-lg"
                : "text-emerald-200 hover:bg-emerald-700/50 hover:text-white"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </NavLink>

          <NavLink
            to="student-management"
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-1 ${
              activeTab === "student-management"
                ? "bg-emerald-700 text-white shadow-lg"
                : "text-emerald-200 hover:bg-emerald-700/50 hover:text-white"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Users className="w-4 h-4" />
            <span>Your Students</span>
          </NavLink>

          {/* Show All Students only to superadmin */}
          {role === "superadmin" && (
            <NavLink
              to="all-students"
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-1 ${
                activeTab === "all-students"
                  ? "bg-emerald-700 text-white shadow-lg"
                  : "text-emerald-200 hover:bg-emerald-700/50 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Users className="w-4 h-4" />
              <span>All Students</span>
            </NavLink>
          )}
          {/* Admins tab visible only to superadmin */}
          {role === "superadmin" && (
            <NavLink
              to="admin-management"
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-1 ${
                activeTab === "admin-management"
                  ? "bg-emerald-700 text-white shadow-lg"
                  : "text-emerald-200 hover:bg-emerald-700/50 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <UserCheck className="w-4 h-4" />
              <span>Admins/Teachers</span>
            </NavLink>
          )}

          <NavLink
            to="course-management"
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-1 ${
              activeTab === "course-management"
                ? "bg-emerald-700 text-white shadow-lg"
                : "text-emerald-200 hover:bg-emerald-700/50 hover:text-white"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses</span>
          </NavLink>

          <NavLink
            to="books"
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-1 ${
              activeTab === "books"
                ? "bg-emerald-700 text-white shadow-lg"
                : "text-emerald-200 hover:bg-emerald-700/50 hover:text-white"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <RiBookShelfLine className="w-4 h-4" />
            <span>Library</span>
          </NavLink>

          <NavLink
            to="settings"
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-1 ${
              activeTab === "settings"
                ? "bg-emerald-700 text-white shadow-lg"
                : "text-emerald-200 hover:bg-emerald-700/50 hover:text-white"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="absolute bottom-10 md:bottom-4 left-4 right-4 md:block lg:block">
          <div className="p-3 text-center rounded-lg bg-emerald-700/50">
            <Moon className="w-6 h-6 mx-auto mb-2 text-emerald-200" />
            <p className="text-xs text-emerald-200">اللَّهُمَّ بَارِكْ لَنَا</p>
            <p className="mt-1 text-xs text-emerald-300">May Allah bless us</p>
            <button
              onClick={handleLogout}
              className="px-6 py-2 mt-2 mr-1 text-xs rounded-md bg-amber-50"
            >
              Logout
            </button>
            <NavLink
              to={"/"}
              className="px-6 py-2 mt-2 text-xs rounded-md bg-amber-50"
            >
              Home
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
