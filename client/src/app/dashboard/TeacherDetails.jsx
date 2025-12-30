import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  User,
  Mail,
  Phone,
  Globe,
  Calendar,
  BookOpen,
  Users,
  Star,
  Clock,
  Award,
  MapPin,
  GraduationCap,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Edit,
  Eye,
  Video,
  Badge,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function TeacherDetails() {
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [teacher, setTeacher] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("overview");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const FloatingElements = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-20 h-20 rounded-full top-20 left-10 bg-emerald-200/20 blur-xl animate-bounce"></div>
      <div className="absolute w-16 h-16 rounded-full top-40 right-20 bg-green-300/20 blur-xl animate-pulse"></div>
      <div
        className="absolute w-24 h-24 rounded-full bottom-20 left-1/4 bg-emerald-100/30 blur-2xl animate-bounce"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute rounded-full bottom-40 right-1/3 w-18 h-18 bg-green-200/25 blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/super/getTeacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setTeacher(data);
        console.log("admin data is ", data);
        setPreview(data.img);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/super/getStudents/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      const studentList = Array.isArray(result)
        ? result
        : result.students || [];
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Mock additional teacher data - replace with actual API response fields
  const getEnhancedTeacherData = (teacher) => ({
    ...teacher,
    specialization: teacher.specialization || "Quran Recitation & Tajweed",
    experience: teacher.experience || "5+ Years",
    qualification: teacher.qualification || "Master's in Islamic Studies",
    language: teacher.language || "Arabic, English, Urdu",
    rating: teacher.rating || 4.8,
    totalStudents: students.length || 0,
    completedCourses: teacher.completedCourses || 120,
    whatsapp: teacher.whatsapp || 33423442,
    joiningDate: teacher.createdAt || "2020-01-15",
    location: teacher.location || teacher.country || "Pakistan",
    timezone: teacher.timezone || "PKT (UTC+5)",
    availability: teacher.availability || "Mon-Fri: 9 AM - 6 PM",
    bio:
      teacher.designation ||
      "Dedicated Quran teacher with passion for Islamic education and student development.",
  });

  const getStudentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-emerald-700 bg-emerald-100 border-emerald-300";
      case "inactive":
        return "text-gray-700 bg-gray-100 border-gray-300";
      case "completed":
        return "text-green-700 bg-green-100 border-green-300";
      default:
        return "text-blue-700 bg-blue-100 border-blue-300";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-emerald-600 border-t-transparent animate-spin"></div>
          <p className="font-medium text-emerald-600">
            Loading teacher details...
          </p>
        </div>
      </div>
    );
  }

  const enhancedTeacher = getEnhancedTeacherData(teacher || {});

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <FloatingElements />

      <div className="relative z-10 p-4 md:p-8">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 text-sm transition-all duration-200 border shadow-sm text-emerald-700 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-emerald-100 border-emerald-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teachers
          </button>
        </div>

        {/* Teacher Profile Header */}
        <div className="mb-8 overflow-hidden border shadow-xl bg-white/70 backdrop-blur-sm rounded-2xl border-emerald-200/50">
          <div className="p-8 text-white bg-gradient-to-r from-emerald-500 to-green-600">
            <div className="flex flex-col items-center gap-3 md:gap-8 lg:flex-row">
              {/* Profile Image */}
              <div className="relative">
                <div className="overflow-hidden border-4 rounded-full shadow-2xl w-22 h-22 md:w-28 md:h-28 border-white/30">
                  {preview ? (
                    <img
                      src={preview}
                      alt={enhancedTeacher.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-white/20">
                      <User className="w-16 h-16 text-white/60" />
                    </div>
                  )}
                </div>
                <div className="absolute flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-lg md:w-7 md:h-7 bottom-2 -right-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current md:w-5 md:h-5" />
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="mb-2 text-2xl font-bold lg:text-3xl">
                  {enhancedTeacher.name || "Teacher Name"}
                </h1>
                <p className="mb-2 text-sm text-emerald-100">
                  {enhancedTeacher.designation}
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-2 lg:justify-start">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-300 fill-current" />
                    <span className="text-sm font-semibold">
                      {enhancedTeacher.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{enhancedTeacher.totalStudents} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-sm" />
                    <span>{enhancedTeacher.experience}</span>
                  </div>
                </div>

                <p className="max-w-2xl text-sm text-emerald-100">Available</p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${enhancedTeacher.whatsapp}?text=Assalam O Alikum! I would like to discuss about teaching.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-all duration-200 md:px-6 md:py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Contact
                </a>
                <button
                  onClick={() =>
                    alert("This Feature will comming soon InshaAllah")
                  }
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-all duration-200 md:px-6 md:py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30"
                >
                  <Video className="w-5 h-5" />
                  Schedule
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-emerald-200">
            <div className="flex overflow-x-auto">
              {[
                { key: "overview", label: "Overview", icon: Eye },
                { key: "students", label: "Students", icon: Users },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedView(key)}
                  className={`flex items-center gap-2 text-xs md:text-sm  px-6 py-4 font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    selectedView === key
                      ? "text-emerald-600 border-emerald-600 bg-emerald-50"
                      : "text-gray-600 border-transparent hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content based on selected view */}
        {selectedView === "overview" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="p-6 border shadow-xl bg-white/70 backdrop-blur-sm rounded-2xl border-emerald-200/50">
              <h3 className="flex items-center gap-2 mb-6 text-sm font-bold md:text-lg text-emerald-800">
                <Mail className="w-5 h-5" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.whatsapp || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Location
                    </p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Timezone
                    </p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.timezone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="p-6 border shadow-xl bg-white/70 backdrop-blur-sm rounded-2xl border-emerald-200/50">
              <h3 className="flex items-center gap-2 mb-6 text-sm font-bold md:text-lg text-emerald-800">
                <GraduationCap className="w-5 h-5" />
                Academic Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Specialization
                    </p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.specialization}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50">
                  <Award className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Qualification
                    </p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.qualification}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Experience
                    </p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.experience}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                  <Globe className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Languages
                    </p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.language}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="p-6 border shadow-xl bg-white/70 backdrop-blur-sm rounded-2xl border-emerald-200/50">
              <h3 className="flex items-center gap-2 mb-6 text-sm font-bold md:text-lg text-emerald-800">
                <Badge className="w-5 h-5" />
                Statistics
              </h3>
              <div className="space-y-6">
                <div className="p-4 text-center bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl">
                  <div className="mb-1 text-2xl font-bold text-emerald-800">
                    {enhancedTeacher.totalStudents}
                  </div>
                  <div className="text-sm font-medium text-emerald-600">
                    Total Students
                  </div>
                </div>

                <div className="p-4 text-center bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl">
                  <div className="mb-1 text-2xl font-bold text-blue-800 md:text-3xl">
                    {enhancedTeacher.completedCourses}
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    Completed Sessions
                  </div>
                </div>

                <div className="p-4 text-center bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl">
                  <div className="mb-1 text-2xl font-bold text-amber-800">
                    {enhancedTeacher.rating}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm font-medium text-amber-600">
                    <Star className="w-3 h-3 fill-current" />
                    Average Rating
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                  <div className="mb-2 text-xs font-medium text-purple-600">
                    Member Since
                  </div>
                  <div className="font-semibold text-purple-800">
                    {new Date(enhancedTeacher.joiningDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === "students" && (
          <div className="overflow-hidden border shadow-xl bg-white/70 backdrop-blur-sm rounded-2xl border-emerald-200/50">
            <div className="p-6 border-b border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl text-emerald-800">
                    Assigned Students
                  </h3>
                  <p className="text-xs text-emerald-600">
                    {students.length} students currently enrolled
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-800">
                    {students.length}
                  </div>
                  <div className="text-xs text-emerald-600">Total Students</div>
                </div>
              </div>
            </div>

            {students.length > 0 ? (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 ">
                  {students.map((student, index) => (
                    <div
                      key={student._id || index}
                      className="p-6 transition-all duration-300 transform border shadow-lg bg-gradient-to-br from-white to-emerald-50 rounded-xl border-emerald-100 hover:shadow-xl hover:-translate-y-1"
                    >
                      {/* Student Header */}
                      <div className="flex items-center gap-2 mb-4 w-fit">
                        <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-green-600">
                          {student.name?.charAt(0) || "S"}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold md:text-lg text-emerald-800">
                            {student.name || "Student Name"}
                          </h4>
                          <p className="text-xs md:text-sm text-emerald-600">
                            {student.email || "No email provided"}
                          </p>
                        </div>
                      </div>

                      {/* Student Details */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-emerald-600" />
                          <span className="text-gray-700">
                            {student.whatsapp || student.phone || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">
                            {student.country || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-700">
                            {student.course || "Quran Studies"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <span className="text-gray-700">
                            Joined:{" "}
                            {student.joinDate
                              ? new Date(student.joinDate).toLocaleDateString(
                                  "en-GB"
                                )
                              : "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="pt-4 mt-4 border-t border-emerald-100">
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border ${getStudentStatusColor(
                              student.status || "active"
                            )}`}
                          >
                            <CheckCircle className="w-3 h-3" />
                            {student.status || "Active"}
                          </span>

                          {student.whatsapp && (
                            <a
                              href={`https://wa.me/${student.whatsapp}?text=Assalam O Alikum! This is regarding your Quran classes.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-green-600 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
                              title="Contact Student"
                            >
                              <FaWhatsapp className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-green-100">
                  <Users className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-emerald-800">
                  No Students Assigned
                </h3>
                <p className="text-emerald-600">
                  This teacher doesn't have any students assigned yet.
                </p>
              </div>
            )}
          </div>
        )}

        {selectedView === "schedule" && (
          <div className="p-6 border shadow-xl bg-white/70 backdrop-blur-sm rounded-2xl border-emerald-200/50">
            <h3 className="flex items-center gap-2 mb-6 text-2xl font-bold text-emerald-800">
              <Calendar className="w-6 h-6" />
              Teaching Schedule
            </h3>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <h4 className="mb-4 font-semibold text-emerald-800">
                  Availability
                </h4>
                <p className="mb-4 text-gray-700">
                  {enhancedTeacher.availability}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/60">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-emerald-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/60">
                    <span className="font-medium">Saturday</span>
                    <span className="text-emerald-600">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/60">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-500">Off</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
                <h4 className="mb-4 font-semibold text-blue-800">
                  Quick Stats
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">
                        40 Hours/Week
                      </p>
                      <p className="text-sm text-blue-600">
                        Average Teaching Time
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">
                        {students.length} Active
                      </p>
                      <p className="text-sm text-green-600">Current Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDetails;
