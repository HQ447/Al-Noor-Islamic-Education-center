import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/authUtils";
import logoImage from "../assets/logo1.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const userImg = localStorage.getItem("userImg");
  const user = localStorage.getItem("user");

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        handleLogout();
        navigate("/");
      }
    };
    const interval = setInterval(checkTokenExpiry, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <div className="lg:hidden ">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 rounded-md hover:text-green-800 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <img
                src={logoImage}
                alt=""
                className="rounded-full w-9 h-9 md:w-13 md:h-13"
              />
              <NavLink to={"/"} className="flex flex-col">
                <h1 className="text-[16px] font-bold text-gray-800 sm:text-base lg:text-xl">
                  Al Noor Islamic Center
                </h1>
                <p className=" text-[8px] md:text-[10px] text-gray-600 sm:block sm:text-xs">
                  Distance Learning Academy
                </p>
              </NavLink>
            </div>

            {/* Desktop Nav Links */}
            <div className="items-center hidden space-x-8 lg:flex">
              {["", "courses", "about", "fee", "library", "contact"].map(
                (link) => (
                  <NavLink
                    key={link}
                    to={link}
                    className="relative font-semibold text-red-800 transition hover:text-green-800 group"
                  >
                    {link === ""
                      ? "Home"
                      : link.charAt(0).toUpperCase() + link.slice(1)}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-800 transition-all duration-200 group-hover:w-full"></span>
                  </NavLink>
                )
              )}
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-2 lg:gap-3">
              {role === "admin" || role === "superadmin" ? (
                <>
                  <div
                    onClick={() => navigate("/admin-dashboard")}
                    className="flex items-center justify-center gap-2 px-2 py-2 rounded-md cursor-pointer bg-emerald-700 md:py-2 md:px-2 "
                  >
                    <div className="relative flex items-center gap-1">
                      <span className="text-[10px]  capitalize sm:text-xs font-medium text-white ">
                        {name?.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="items-center hidden gap-2 px-3 py-2 text-xs font-medium text-white bg-red-500 rounded-md sm:flex hover:bg-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className=" sm:inline">Logout</span>
                  </button>
                </>
              ) : role === "student" ? (
                <div className="px-3 py-2 text-green-800 bg-green-100 border border-green-200 rounded-full">
                  <p className="text-sm font-medium">✅ Registered</p>
                </div>
              ) : (
                <>
                  {/* Admin Login: Only on large screen */}
                  <NavLink
                    to="admin-Login"
                    className="hidden px-3 py-2 text-xs font-medium border rounded-sm border-emerald-500 green-500 lg:inline hover:bg-emerald-600 hover:text-white hover:shadow-lg"
                  >
                    Admin Login
                  </NavLink>

                  {/* Register Now: Always visible */}
                  <NavLink
                    to="register-student"
                    className="px-2 py-2 text-xs font-medium text-white rounded-sm bg-gradient-to-r from-teal-500 to-teal-600 sm:px-3 sm:py-2 hover:bg-green-700 hover:shadow-lg"
                  >
                    Register Now
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={closeMobileMenu}
          ></div>
        )}

        {/* Mobile Sidebar */}
        <>
          {/* Backdrop/Overlay */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 lg:hidden ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={closeMobileMenu}
          />

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 shadow-md rounded-xl ">
                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
                    <img
                      src={logoImage}
                      alt=""
                      className="rounded-full w-9 h-9 md:w-13 md:h-13"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold leading-tight text-gray-800">
                    Noor Islamic Center
                  </h2>
                  <p className="text-xs font-medium text-gray-600">
                    Distance Learning Plateform
                  </p>
                </div>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-white hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-2">
              {[
                { to: "", label: "Home", icon: "🏠" },
                { to: "courses", label: "Courses", icon: "📚" },
                { to: "about", label: "About", icon: "ℹ️" },
                { to: "fee", label: "Fee Plan", icon: "💰" },
                { to: "library", label: "Library", icon: "📖" },
                { to: "contact", label: "Contact", icon: "📞" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  onClick={closeMobileMenu}
                  to={link.to}
                  className="flex items-center gap-4 px-4 py-3 mx-4 my-1 font-medium text-gray-700 transition-all duration-200 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 group"
                >
                  <span className="text-lg transition-transform duration-200 group-hover:scale-110">
                    {link.icon}
                  </span>
                  <span className="font-semibold">{link.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
              {!role ? (
                <NavLink
                  to="admin-Login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 transform shadow-md bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105"
                >
                  <span>Admin Login</span>
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 transform shadow-md bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </>
      </nav>
    </>
  );
}

export default Navbar;
