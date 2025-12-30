import React from "react";
import {
  BookOpen,
  Users,
  Award,
  Heart,
  Globe,
  Star,
  AlertCircle,
  Wifi,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Github, Linkedin, Mail, Code } from "lucide-react";
import developer from "../../../assets/developer.jpg";

// Team Member Skeleton Component
const TeamMemberSkeleton = () => (
  <div className="relative p-6 transition-all duration-300 border shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl border-emerald-200/50">
    {/* Role badge skeleton */}
    <div className="absolute top-4 right-4">
      <div className="w-16 h-5 rounded-full bg-emerald-100 animate-pulse"></div>
    </div>

    {/* Main content */}
    <div className="relative z-10">
      <div className="flex flex-col items-center mb-6">
        {/* Avatar skeleton */}
        <div className="mb-4">
          <div className="w-16 h-16 border-4 border-green-200 rounded-full md:w-20 md:h-20 bg-emerald-100 animate-pulse"></div>
        </div>

        {/* Name and email skeleton */}
        <div className="text-center">
          <div className="w-24 h-5 mb-2 rounded bg-emerald-100 animate-pulse"></div>
          <div className="w-32 h-4 mb-3 rounded bg-emerald-100 animate-pulse"></div>
          <div className="w-20 h-6 rounded-full bg-emerald-100 animate-pulse"></div>
        </div>
      </div>

      {/* Action button skeleton */}
      <div className="flex justify-center">
        <div className="w-24 h-9 rounded-xl bg-emerald-100 animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Error Message Component for Team Section
const TeamErrorMessage = ({ error, onRetry }) => {
  const isNetworkError =
    error?.code === "NETWORK_ERROR" ||
    error?.message?.includes("Network Error") ||
    !navigator.onLine;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-emerald-100">
        {isNetworkError ? (
          <Wifi className="w-8 h-8 text-emerald-600" />
        ) : (
          <AlertCircle className="w-8 h-8 text-emerald-600" />
        )}
      </div>

      <h3 className="mb-2 text-lg font-bold text-gray-800">
        {isNetworkError ? "Connection Problem" : "Unable to Load Team"}
      </h3>

      <p className="max-w-md mb-4 text-sm text-gray-600">
        {isNetworkError
          ? "Please check your internet connection and try again."
          : "We encountered an error while loading our team members. Please try again."}
      </p>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 rounded-lg shadow-md bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
};

// Empty Team State Component
const EmptyTeamState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-emerald-100">
      <Users className="w-8 h-8 text-emerald-600" />
    </div>

    <h3 className="mb-2 text-lg font-bold text-gray-800">
      No Team Members Found
    </h3>

    <p className="max-w-md text-sm text-gray-600">
      Our team information is currently not available. Please check back later
      or contact us for more information.
    </p>
  </div>
);

function About() {
  const [teamData, setTeamData] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const stats = [
    { number: "10,000+", label: "Students Worldwide", icon: Users },
    { number: "500+", label: "Certified Teachers", icon: Award },
    { number: "50+", label: "Countries Served", icon: Globe },
    { number: "99%", label: "Success Rate", icon: Star },
  ];

  const fetchTeamData = async () => {
    try {
      setTeamLoading(true);
      setTeamError(null);

      const response = await fetch(`${BASE_URL}/admin/getAdmins`, {
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Handle different API response shapes
      if (Array.isArray(data)) {
        setTeamData(data);
      } else if (Array.isArray(data.admins)) {
        setTeamData(data.admins);
      } else {
        console.warn("Unexpected API shape");
        setTeamData([]);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);

      // Determine error type
      if (!navigator.onLine) {
        setTeamError({
          code: "NETWORK_ERROR",
          message: "No internet connection",
        });
      } else if (
        error.name === "AbortError" ||
        error.message.includes("timeout")
      ) {
        setTeamError({ code: "TIMEOUT_ERROR", message: "Request timeout" });
      } else if (error.message.includes("HTTP error")) {
        setTeamError({ code: "SERVER_ERROR", message: "Server error" });
      } else {
        setTeamError({
          code: "UNKNOWN_ERROR",
          message: error.message || "Unknown error occurred",
        });
      }

      setTeamData([]);
    } finally {
      setTeamLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const handleRetryTeam = () => {
    fetchTeamData();
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden text-white bg-gradient-to-r from-green-600 to-emerald-600">
        {/* Islamic Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M30 0l15 15-15 15-15-15zM0 30l15 15-15 15-15-15zM30 30l15 15-15 15-15-15zM60 30l15 15-15 15-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-6xl px-6 mx-auto text-center lg:px-12">
          <div className="mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-semibold text-black bg-white rounded-full bg-opacity-20">
              🕌 About Islamic Center
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
            Empowering Hearts Through
            <span className="block text-yellow-300">Islamic Knowledge</span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm leading-relaxed text-green-100 md:text-lg ">
            Dedicated to spreading the beautiful teachings of Islam through
            authentic Quranic education and spiritual guidance
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl px-6 mx-auto lg:px-12">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              👥 Our Team
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800 lg:text-3xl">
              Meet Our Scholars
            </h2>
            <p className="max-w-2xl mx-auto text-sm text-gray-600">
              Learn from qualified Islamic scholars and experienced educators
            </p>
          </div>

          {/* Team Members Grid */}
          {teamLoading ? (
            // Loading Skeleton
            <div className="grid gap-8 md:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <TeamMemberSkeleton key={index} />
              ))}
            </div>
          ) : teamError ? (
            // Error State
            <TeamErrorMessage error={teamError} onRetry={handleRetryTeam} />
          ) : teamData.length === 0 ? (
            // Empty State
            <EmptyTeamState />
          ) : (
            // Team Members
            <div className="grid gap-8 md:grid-cols-3">
              {teamData.map((member) => (
                <div
                  key={member._id}
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
                    🔰 {member.role === "admin" ? "Teacher" : "Super Admin"}
                  </div>

                  {/* Main content with proper z-index */}
                  <div className="relative z-10">
                    <div className="flex flex-col items-center ">
                      <div className="flex-shrink-0 ">
                        <div className="relative">
                          <div className="w-20 h-20 p-1 transition-all duration-300 rounded-full md:w-24 md:h-24 group-hover:scale-105">
                            {/* <img
                              src={developer}
                              alt="Developer Profile"
                              className="object-cover w-full h-full border-4 border-white rounded-full shadow-lg"
                            /> */}
                            <div className="">
                              {member.img ? (
                                <div className="p-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
                                  <img
                                    src={member.img}
                                    alt={member.name}
                                    className="object-cover w-16 h-16 transition-shadow rounded-full shadow-lg md:w-20 md:h-20 group-hover:shadow-xl"
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white transition-shadow rounded-full shadow-lg md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-600 group-hover:shadow-xl">
                                  {member?.name?.charAt(0).toUpperCase() || "A"}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Status Indicator */}
                          <div className="absolute flex items-center justify-center w-6 h-6 bg-green-500 border-white rounded-full bottom-1 right-1 border-3">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <h3 className="mb-1 text-lg font-bold text-green-800">
                          {member.name}
                        </h3>
                        <div className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md bg-gradient-to-r from-indigo-500 to-purple-600">
                          <Award className="w-3 h-3 mr-1" />
                          {member.designation || "Teacher"}
                        </div>
                        <p className="my-2 text-xs text-gray-500">
                          "Dedicated to teaching the Quran with clarity and
                          patience, guiding learners of all ages through
                          personalized online sessions."
                        </p>
                        <p className="mb-3 text-sm text-green-600">
                          {member.email}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons with proper z-index and contrast */}
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          navigate(`/teacher-detail/${member._id}`)
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
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-6 mx-auto lg:px-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center mb-4 transition-transform rounded-full md:w-15 md:h-15 w-13 h-13 bg-gradient-to-br from-green-500 to-emerald-600 group-hover:scale-110">
                    <IconComponent className="w-6 h-6 text-white md:w-8 md:h-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-800 md:text-2xl lg:text-3xl">
                    {stat.number}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 md:text-lg">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl px-6 mx-auto lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                🎯 Our Mission
              </div>
              <h2 className="mb-6 text-2xl font-bold text-gray-800 lg:text-4xl">
                Nurturing Souls Through
                <span className="text-green-600"> Sacred Knowledge</span>
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-justify text-gray-600 md:text-lg">
                At Islamic Center, we believe that authentic Islamic education
                is the key to spiritual growth and community building. Our
                mission is to make quality Quranic education accessible to
                Muslims worldwide, regardless of their location or background.
              </p>
              <p className="text-sm leading-relaxed text-justify text-gray-600 md:text-lg">
                We combine traditional Islamic scholarship with modern teaching
                methods to create an engaging and effective learning experience
                that honors the sacred nature of Islamic knowledge while meeting
                the needs of contemporary learners.
              </p>
            </div>
            <div className="relative">
              <div className="p-8 bg-white border-t-4 border-green-500 shadow-2xl rounded-2xl">
                <div className="text-center">
                  <div className="mb-4 text-6xl">📖</div>
                  <h3 className="mb-4 text-xl font-bold text-gray-800">
                    Our Vision
                  </h3>
                  <p className="text-sm leading-relaxed text-justify text-gray-600">
                    "To be the leading platform for Islamic education, inspiring
                    millions to connect with the Quran and live according to its
                    guidance, creating a more compassionate and knowledgeable
                    Ummah."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-4xl px-6 mx-auto lg:px-12">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
              💻 Meet The Developer
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800 lg:text-3xl">
              Crafted with Passion
            </h2>
            <p className="max-w-2xl mx-auto text-sm text-gray-600 md:text-base">
              Behind every great platform is a dedicated developer committed to
              excellence
            </p>
          </div>

          {/* Developer Card */}
          <div className="relative p-8 transition-all duration-500 bg-white border shadow-2xl rounded-3xl border-slate-200 hover:shadow-3xl hover:-translate-y-2 group">
            {/* Decorative Background Pattern */}
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

            {/* Main Content */}
            <div className="relative z-10">
              <div className="flex flex-col items-center gap-8 md:flex-row">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 p-1 transition-all duration-300 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 md:w-28 md:h-28 group-hover:scale-105">
                      <img
                        src={developer}
                        alt="Developer Profile"
                        className="object-cover w-full h-full border-4 border-white rounded-full shadow-lg"
                      />
                    </div>
                    {/* Status Indicator */}
                    <div className="absolute flex items-center justify-center w-6 h-6 bg-green-500 border-white rounded-full bottom-1 right-1 border-3">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Developer Info */}
                <div className="flex-grow text-center md:text-left">
                  <div className="mb-4">
                    <h3 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                      Hammad Ahmad
                    </h3>
                    <div className="flex flex-col items-center gap-2 md:flex-row md:items-start">
                      <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
                        Full Stack Developer
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-emerald-500 to-teal-600">
                        MERN Stack Expert
                      </span>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base">
                    Passionate full-stack developer with 2+ years of experience
                    in building scalable web applications. Specialized in
                    React.js, Node.js, and modern web technologies. Committed to
                    creating intuitive user experiences and robust backend
                    solutions.
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                      {[
                        "React",
                        "Node.js",
                        "MongoDB",
                        "Express",
                        "Tailwind CSS",
                        "JavaScript",
                        "Python",
                      ].map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center md:gap-6">
                    <div className="p-3 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100">
                      <div className="mb-1 text-lg font-bold text-indigo-600 md:text-xl">
                        50+
                      </div>
                      <div className="text-xs text-gray-600 md:text-sm">
                        Projects
                      </div>
                    </div>
                    <div className="p-3 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100">
                      <div className="mb-1 text-lg font-bold text-emerald-600 md:text-xl">
                        2+
                      </div>
                      <div className="text-xs text-gray-600 md:text-sm">
                        Years Exp
                      </div>
                    </div>
                    <div className="p-3 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100">
                      <div className="mb-1 text-lg font-bold text-purple-600 md:text-xl">
                        100+
                      </div>
                      <div className="text-xs text-gray-600 md:text-sm">
                        Happy Clients
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact & Social Links */}
              <div className="pt-6 mt-6 border-t border-gray-100">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  {/* Contact Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-indigo-500" />
                    <span>hamadqur447@gmail.com</span>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/hq447"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 text-gray-600 transition-all duration-300 bg-gray-100 rounded-full hover:bg-gray-800 hover:text-white hover:scale-110"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/hammad-ahmad-hq447/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 text-gray-600 transition-all duration-300 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white hover:scale-110"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>

                    <a
                      href="https://hamadahmad.online"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 text-gray-600 transition-all duration-300 bg-gray-100 rounded-full hover:bg-indigo-600 hover:text-white hover:scale-110"
                      title="Portfolio Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="flex flex-col items-center gap-3 pt-6 mt-6 text-center border-t border-gray-100 sm:flex-row sm:justify-center">
                  <a
                    href="https://hamadahmad.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:scale-105"
                  >
                    <Globe className="w-4 h-4" />
                    View Portfolio
                  </a>

                  <a
                    href="mailto:hamadqur447@gmail.com"
                    className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-indigo-600 transition-all duration-300 border-2 border-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:scale-105"
                  >
                    <Mail className="w-4 h-4" />
                    Hire Me
                  </a>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="absolute hidden top-4 right-4 md:block">
                <div className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Award className="w-3 h-3" />
                  Top Developer
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-8 text-center">
            <blockquote className="max-w-2xl mx-auto text-sm italic text-gray-600 md:text-base">
              "Code is like humor. When you have to explain it, it's bad. I
              strive to write clean, self-documenting code that speaks for
              itself."
            </blockquote>
            <cite className="block mt-2 text-xs font-semibold text-indigo-600">
              - Hammad Ahmad
            </cite>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 text-white bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl px-6 mx-auto text-center lg:px-12">
          <h2 className="mb-6 text-2xl font-bold lg:text-4xl">
            Ready to Begin Your Journey?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-sm text-green-100 md:text-xl">
            Join thousands of students worldwide who have transformed their
            lives through authentic Islamic education
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="px-8 py-2 font-semibold text-green-600 transition-colors bg-white rounded-lg shadow-lg lg:py-4 hover:bg-gray-100">
              Start Free Trial
            </button>
            <button className="px-8 py-2 font-semibold text-white transition-colors border-2 rounded-lg md:py-4 bg-emerald-500 hover:bg-emerald-600 border-emerald-400">
              View Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
