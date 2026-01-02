import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  BookOpen,
  Calendar,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
  GraduationCap,
  Users,
} from "lucide-react";
import { useLocation } from "react-router";

const RegStudent = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    course: "",
    teacherId: "",
    joinDate: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/super/getAllTeachers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setTeachers(data.teachers);
    } catch (err) {
      console.error("Failed to fetch teachers", err);
    }
  };

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Bangladesh",
    "Egypt",
    "Indonesia",
    "Iran",
    "Iraq",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Lebanon",
    "Libya",
    "Malaysia",
    "Morocco",
    "Nigeria",
    "Pakistan",
    "Palestine",
    "Qatar",
    "Saudi Arabia",
    "Somalia",
    "Sudan",
    "Syria",
    "Tunisia",
    "Turkey",
    "United Arab Emirates",
    "United States",
    "United Kingdom",
    "Other",
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showErrorModal = (message) => {
    setModalType("error");
    setModalMessage(message);
    setShowModal(true);
  };

  const showSuccessModal = (message) => {
    setModalType("success");
    setModalMessage(message);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.whatsapp ||
      !formData.country ||
      !formData.course ||
      !formData.teacherId ||
      !formData.joinDate
    ) {
      showErrorModal(
        "Please fill in all required fields to complete your registration."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to register student");
      }

      console.log("Registration Data:", formData);
      showSuccessModal(
        "Registration submitted successfully! جزاك الله خيراً. You will be contacted soon for further details."
      );

      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        country: "",
        course: "",
        teacherId: "",
        joinDate: "",
      });
    } catch (error) {
      console.log(error);
      showErrorModal(
        error.message ||
          "An error occurred during registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const Modal = () =>
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
        <div className="w-full max-w-lg mx-4 transition-all transform bg-white shadow-2xl rounded-3xl animate-pulse">
          <div
            className={`p-8 rounded-t-3xl ${
              modalType === "success"
                ? "bg-gradient-to-r from-emerald-500 to-green-600"
                : "bg-gradient-to-r from-red-500 to-red-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {modalType === "success" ? (
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                    <CheckCircle className="text-green-600 w-7 h-7" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                    <AlertCircle className="text-red-600 w-7 h-7" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">
                  {modalType === "success"
                    ? "Registration Successful!"
                    : "Registration Failed"}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-white transition-colors hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="p-8">
            <p className="leading-relaxed text-center text-gray-700">
              {modalMessage}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className={`w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                modalType === "success"
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200 to-green-300 opacity-20 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200 to-emerald-300 opacity-20 blur-3xl"></div>
        <div className="absolute w-64 h-64 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-r from-green-200 to-emerald-200 opacity-10 blur-2xl"></div>
      </div>

      <div className="relative z-10 py-6 lg:py-10">
        {/* Hero Section */}
        <div className="container px-4 mx-auto mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="flex items-center justify-center transform shadow-2xl w-13 h-13 lg:w-15 lg:h-15 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl rotate-3">
                  <BookOpen className="w-6 h-6 text-white lg:w-5 lg:h-5" />
                </div>
                <div className="absolute flex items-center justify-center w-8 h-8 rounded-full -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500">
                  <span className="text-sm font-bold text-white">✨</span>
                </div>
              </div>
            </div>

            <h1 className="mb-4 text-xl font-bold text-transparent lg:text-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text">
              بسم الله الرحمن الرحيم
            </h1>
            <h2 className="mb-6 text-xl font-bold text-gray-800 lg:text-3xl">
              Register Yourself Now!
            </h2>
            <p className="max-w-3xl mx-auto text-sm leading-relaxed text-gray-600 lg:text-lg">
              Embark on your spiritual journey with our comprehensive Quranic
              education programs. Join a global community of learners dedicated
              to Islamic knowledge and understanding.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl border-emerald-100/50">
              {/* Progress Steps */}
              <div className="p-5 bg-gradient-to-r from-emerald-600 to-green-600 lg:p-8">
                <div className="flex items-center justify-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center bg-white rounded-full w-7 h-7 md:w-10 md:h-10">
                      <User className="w-3 h-3 md:w-5 md:h-5 text-emerald-600" />
                    </div>
                    <span className="hidden font-semibold text-white sm:block">
                      Personal Info
                    </span>
                  </div>
                  <div className="w-16 h-1 rounded-full bg-white/30"></div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center bg-white rounded-full w-7 h-7 md:w-10 md:h-10">
                      <GraduationCap className="w-3 h-3 md:w-5 md:h-5 text-emerald-600" />
                    </div>
                    <span className="hidden font-semibold text-white sm:block">
                      Course Selection
                    </span>
                  </div>
                  <div className="w-16 h-1 rounded-full bg-white/30"></div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center bg-white rounded-full w-7 h-7 md:w-10 md:h-10">
                      <Calendar className="w-3 h-3 md:w-5 md:h-5 text-emerald-600" />
                    </div>
                    <span className="hidden font-semibold text-white sm:block">
                      Schedule
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 lg:p-12">
                {/* Section 1: Personal Information */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 md:text-2xl">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* Name */}
                    <div className="group">
                      <label className="block mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 text-gray-800 transition-all duration-300 border-2 border-gray-200 md:py-3 placeholder:text-sm bg-gray-50 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 group-hover:border-gray-300"
                          placeholder="Enter your complete name"
                        />
                        <User className="absolute w-5 h-5 text-gray-400 transition-colors transform -translate-y-1/2 right-4 top-1/2 group-focus-within:text-emerald-500" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label className="block mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 text-gray-800 transition-all duration-300 border-2 border-gray-200 md:py-3 placeholder:text-sm bg-gray-50 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 group-hover:border-gray-300"
                          placeholder="your.email@example.com"
                        />
                        <Mail className="absolute w-5 h-5 text-gray-400 transition-colors transform -translate-y-1/2 right-4 top-1/2 group-focus-within:text-emerald-500" />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="group">
                      <label className="block mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="whatsapp"
                          required
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 text-gray-800 transition-all duration-300 border-2 border-gray-200 placeholder:text-sm md:py-3 bg-gray-50 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 group-hover:border-gray-300"
                          placeholder="+1 234 567 8900"
                        />
                        <Phone className="absolute w-5 h-5 text-gray-400 transition-colors transform -translate-y-1/2 right-4 top-1/2 group-focus-within:text-emerald-500" />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="group">
                      <label className="block mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase">
                        Country *
                      </label>
                      <div className="relative">
                        <select
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 text-sm text-gray-800 transition-all duration-300 border-2 border-gray-200 appearance-none cursor-pointer md:py-3 bg-gray-50 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 group-hover:border-gray-300"
                        >
                          <option value="">Select your country</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        <Globe className="absolute w-5 h-5 text-gray-400 transition-colors transform -translate-y-1/2 right-12 top-1/2 group-focus-within:text-emerald-500" />
                        <div className="absolute transform -translate-y-1/2 pointer-events-none right-4 top-1/2">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Course & Teacher Selection */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 md:text-2xl">
                      Course & Teacher Selection
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* Course */}
                    <div className="group">
                      <label className="block mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase">
                        Islamic Course *
                      </label>
                      <div className="relative">
                        <select
                          name="course"
                          required
                          value={formData.course}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 text-sm text-gray-800 transition-all duration-300 border-2 border-gray-200 appearance-none cursor-pointer md:py-3 placeholder:text-sm bg-gray-50 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 group-hover:border-gray-300"
                        >
                          <option value="">Choose your course</option>
                          {courses.map((course, index) => (
                            <option key={index} value={course.title}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                        <BookOpen className="absolute w-5 h-5 text-gray-400 transition-colors transform -translate-y-1/2 right-12 top-1/2 group-focus-within:text-emerald-500" />
                        <div className="absolute transform -translate-y-1/2 pointer-events-none right-4 top-1/2">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Teacher */}
                    <div className="group">
                      <label className="block mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase">
                        Preferred Teacher *
                      </label>
                      <div className="relative">
                        <select
                          name="teacherId"
                          required
                          value={formData.teacherId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 text-sm text-gray-800 transition-all duration-300 border-2 border-gray-200 appearance-none cursor-pointer md:py-3 placeholder:text-sm bg-gray-50 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 group-hover:border-gray-300"
                        >
                          <option value="">Select your teacher</option>
                          {teachers.map((teacher, index) => (
                              teacher.designation!== "Manager" && 
                            <option key={index} value={teacher._id}>
                              {teacher.name}
                            </option>
                          ))}
                        </select>
                        <Users className="absolute w-5 h-5 text-gray-400 transition-colors transform -translate-y-1/2 right-12 top-1/2 group-focus-within:text-emerald-500" />
                        <div className="absolute transform -translate-y-1/2 pointer-events-none right-4 top-1/2">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Schedule */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 md:text-2xl">
                      Preferred Schedule
                    </h3>
                  </div>

                  <div className="max-w-md">
                    <div className="group">
                      <label className="block mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase">
                        Starting Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="joinDate"
                          required
                          value={formData.joinDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 text-sm text-gray-800 transition-all duration-300 border-2 border-gray-200 md:py-3 placeholder:text-sm bg-gray-50 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 group-hover:border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 text-center border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center px-12 py-2 text-sm font-bold text-white transition-all duration-300 transform shadow-2xl md:py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 rounded-2xl hover:scale-105 focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-4 h-4 mr-3 md:w-6 md:h-6 animate-spin" />
                        Processing Registration...
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-3 md:w-6 md:h-6" />
                        Complete Registration{" "}
                        <span className="hidden md:flex">- إنشاء الله</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Footer Quote */}
              <div className="px-8 py-8 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-emerald-50">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="mb-3 text-lg font-semibold text-gray-700">
                    "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا"
                  </p>
                  <p className="mb-2 text-sm text-gray-600">
                    "And whoever fears Allah - He will make for him a way out" -
                    Quran 65:2
                  </p>
                  <p className="text-sm font-medium text-emerald-600">
                    May Allah bless your learning journey and grant you success
                    in both worlds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal />
    </div>
  );
};

export default RegStudent;
