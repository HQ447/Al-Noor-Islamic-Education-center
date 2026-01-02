import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
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
import { FaWhatsapp, FaDollarSign } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

function StudentDetails() {
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [teacher, setTeacher] = useState({});
  const [students, setStudents] = useState([]);
  const [days, setDays] = useState("0");
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("overview");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

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
  const handleApprove = async (studentId) => {
    if(!teacherId){
      alert("Please select a teacher");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/admin/updateStatus/${studentId}/${teacherId}`, {
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
        fetchProfile();
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

  const d = new Date();
  const monthName = d.toLocaleString("en-US", { month: "long" });

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

  const updateFee = async (studentId) => {
    if (!days) {
      alert("Please enter days");
      return;
    }
    try {
      const res = await fetch(
        `${BASE_URL}/admin/updateStudentFee/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({ days }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update fee");
        return;
      }

      console.log("Fee updated successfully");

      // Refresh students list
      fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/student/${id}`, {
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
    fetchTeachers();
    fetchProfile();
  }, [id]);

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
            Back to Students
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
                <h1 className="mb-2 text-2xl font-bold capitalize lg:text-3xl">
                  {enhancedTeacher.name || "N/A"}
                </h1>
                <p className="mb-2 text-sm text-emerald-100"></p>

                <div className="flex flex-wrap justify-center gap-4 mb-2 lg:justify-start">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>Student of {teacher.course}</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <div className="flex items-center gap-2 text-sm">
                    <p
                      className={`px-2 py-1 flex self-center justify-self-center  text-xs font-bold text-white rounded-md  ${
                        teacher.status?.toLowerCase() === "pending"
                          ? "bg-amber-500"
                          : "bg-white/20"
                      } w-fit capitalize`}
                    >
                      {teacher.status}
                    </p>
                  </div>
                </div>
              </div>

             
              {/* Quick Actions */}
              <div className="flex flex-col gap-3">
                {teacher.status?.toLowerCase() === "pending" ? (
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-all duration-200 cursor-pointer md:px-6 md:py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30"
                  >
                    <span>Approve Student</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white capitalize transition-all duration-200 md:px-6 md:py-3 bg-emerald-600 backdrop-blur-sm rounded-xl ">
                    <span className="flex items-center justify-center gap-2">
                      <IoCheckmarkDoneCircle className="w-5 h-5" />{" "}
                      {teacher.status}
                    </span>
                  </div>
                )}
                <a
                  href={`https://wa.me/${enhancedTeacher.whatsapp}?text=Assalam O Alikum! I would like to discuss about teaching.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-all duration-200 md:px-6 md:py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-emerald-200">
            <div className="flex overflow-x-auto">
              {[{ key: "overview", label: "Overview", icon: Eye }].map(
                ({ key, label, icon: Icon }) => (
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
                )
              )}
            </div>
          </div>
        </div>

        {/* Content based on selected view */}
        {selectedView === "overview" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Fee Statistics */}
            <div className="p-6 border shadow-xl bg-white/70 backdrop-blur-sm rounded-2xl border-emerald-200/50">
              <h3 className="flex items-center gap-2 mb-6 text-sm font-bold md:text-lg text-emerald-800">
                <Badge className="w-5 h-5" />
                {teacher.status !== "pending" ? "Fee Statistics" : "Actions"}
              </h3>
              {enhancedTeacher.status !== "pending" ? (
                <div className="space-y-6">
                  {teacher.feeStatus == "unclear" && (
                    <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-r from-emerald-100 to-emerald-100 ">
                      <div
                        className={` flex gap-2 text-center mb-2
                  `}
                      >
                        <input
                          type="number"
                          className="flex items-center w-full gap-2 px-6 py-3 text-xs font-medium text-gray-700 transition-all duration-200 outline-none cursor-pointer bg-emerald-200 backdrop-blur-sm rounded-xl "
                          placeholder="Enter days"
                          onChange={(e) => setDays(e.target.value)}
                        />
                        <button
                          onClick={() => updateFee(teacher._id)}
                          className={` ${
                            days == "" ? "bg-emerald-400" : "bg-emerald-600 "
                          } flex w-full items-center gap-2  text-xs font-medium text-white transition-all duration-200 cursor-pointer px-6 py-2 backdrop-blur-sm rounded-xl hover:bg-emerald-500`}
                        >
                          <FaDollarSign className="w-5 h-5" />
                          Pay Fee
                        </button>
                      </div>
                      <div className={`text-xs    text-emerald-800`}>
                        How many days fee he want to Pay?
                      </div>
                    </div>
                  )}
                  <div
                    className={`p-4 text-center bg-gradient-to-r  ${
                      enhancedTeacher.feeStatus == "clear"
                        ? "from-emerald-100 to-green-100 "
                        : "from-red-100 to-red-100 "
                    } from-emerald-100 to-green-100 rounded-xl`}
                  >
                    <div
                      className={`mb-1 text-2xl font-bold capitalize  ${
                        enhancedTeacher.feeStatus == "clear"
                          ? "text-emerald-800"
                          : "text-red-800"
                      }`}
                    >
                      {enhancedTeacher.feeStatus}
                    </div>
                    <div
                      className={`  ${
                        enhancedTeacher.feeStatus == "clear"
                          ? "text-emerald-800"
                          : "text-red-800"
                      } text-sm font-medium text-emerald-600`}
                    >
                      Fee Status
                    </div>
                  </div>

                  <div className="p-4 text-center bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl">
                    <div className="mb-1 text-xl font-bold text-blue-800 ">
                      {teacher.feeDays || "0"} Days
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      Fee Paid
                    </div>
                  </div>

                  <div className="p-4 text-center bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl">
                    <div className="mb-1 text-xl font-bold text-amber-800">
                      {teacher.feeEndDate
                        ? new Date(teacher.feeEndDate).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Not Paid"}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm font-medium text-amber-600">
                      <Star className="w-3 h-3 fill-current" />
                      Fee Paid Upto
                    </div>
                  </div>
                </div>
              ) : (
                 <div className="flex flex-col gap-3">
                  <p className="text-xs text-red-600">Student is waiting for your approval , kindly assign instructor and approve student request.</p>
                <select
                  name="teacher"
                  id=""
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-all duration-200 cursor-pointer md:px-6 md:py-3 bg-emerald-600 backdrop-blur-sm rounded-xl "
                
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id} className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-all duration-200 cursor-pointer md:px-6 md:py-3 bg-emerald-800 backdrop-blur-sm rounded-xl "
                >
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleApprove(id)}
                  className="flex items-center gap-2 px-4 py-2 mx-auto text-xs font-medium text-white transition-all duration-200 bg-orange-500 cursor-pointer w-fit md:px-6 md:py-3 backdrop-blur-sm rounded-xl hover:bg-emerald-600"
                >
                  <span>Approve Student</span>
                </button>
              </div>
              )}
            </div>
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
                      {enhancedTeacher.country}
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
                      Enrolled In
                    </p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.course}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50">
                  <Award className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Teacher</p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {teacher.teacherName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Joining Date
                    </p>
                    <p className="font-semibold text-[13px] text-gray-800">
                      {enhancedTeacher.joinDate}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;
