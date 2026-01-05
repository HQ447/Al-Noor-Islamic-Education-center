import { Upload, Edit, Star, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

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

const Setting = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    designation: "",
    qualification: "",
    experience: "",
    whatsapp: "",
    country: "",
    img: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("token");
  // Fetch current admin info on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/admin/getAdminProfile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(data);
        console.log(data);
        setPreview(data.img);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!admin.name && !admin.email) return alert("Fill all fields");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      if (admin.name) formData.append("name", admin.name);
      if (admin.email) formData.append("email", admin.email);
      if (admin.designation) formData.append("designation", admin.designation);
      if (admin.qualification)
        formData.append("qualification", admin.qualification);
      if (admin.whatsapp) formData.append("whatsapp", admin.whatsapp);
      if (admin.country) formData.append("country", admin.country);
      if (admin.experience) formData.append("experience", admin.experience);
      if (imageFile) formData.append("img", imageFile);

      await axios.put(`${BASE_URL}/admin/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="p-6">
      <div className="relative mb-3">
        <div className="flex items-center gap-3 mb-3">
          <div>
            <h2 className="text-xl font-bold text-transparent md:text-2xl bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text">
              Settings
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Sparkles className="w-4 h-4 text-green-500" />
              <p className="text-xs font-medium text-green-600 md:text-sm">
                Manage Your Profile and Preference
              </p>
            </div>
          </div>
        </div>
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 md:gap-6">
        <div className="p-4 border shadow-lg bg-white/80 backdrop-blur-sm rounded-xl md:p-6 border-emerald-200/20">
          <h3 className="mb-4 text-base font-semibold md:text-lg text-emerald-800">
            Profile Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 overflow-hidden text-xl font-bold text-white rounded-full md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 md:text-2xl">
                  {preview ? (
                    <img
                      src={preview}
                      alt="profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    admin?.name?.charAt(0).toUpperCase() || "A"
                  )}
                </div>
                <label className="absolute p-3 z-10 flex items-center justify-center text-white transition-colors rounded-full shadow-lg cursor-pointer -bottom-2 -right-2 bg-emerald-600 hover:bg-emerald-700 min-w-[2.5rem] min-h-[2.5rem]">
                  <Upload className="w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={admin.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={admin.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Phone
              </label>
              <input
                name="whatsapp"
                type="number"
                value={admin.whatsapp}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-xs text-gray-500">
                Do not add "+" sign or 0. Start directly with the country code
                (e.g 1, 92, 966, etc.)
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Country
              </label>
              <input
                name="country"
                type="text"
                value={admin.country}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Designation
              </label>
              <input
                name="designation"
                value={admin.designation}
                onChange={handleChange}
                placeholder="Your Designation"
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Qualification
              </label>
              <input
                name="qualification"
                value={admin.qualification}
                onChange={handleChange}
                placeholder="Enter your Qualification "
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Experience (in Years)
              </label>
              <input
                name="experience"
                value={admin.experience}
                onChange={handleChange}
                placeholder="How many year of Experience you have"
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-sm text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
            >
              <Edit className="w-4 h-4" />
              <span>Update Profile</span>
            </button>
          </div>
        </div>

        {/* Platform Settings (unchanged) */}
        <div className="p-4 border shadow-lg bg-white/80 backdrop-blur-sm rounded-xl md:p-6 border-emerald-200/20">
          <h3 className="mb-4 text-base font-semibold md:text-lg text-emerald-800">
            Platform Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="Al Noor Islamic Education Center"
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="alnoorisledu@gmail.com"
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-700">
                Platform Description
              </label>
              <textarea
                rows="4"
                defaultValue="A comprehensive Islamic learning platform dedicated to spreading knowledge and understanding of Islam through quality courses and resources."
                className="w-full px-3 py-2 text-sm border rounded-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50/50">
              <span className="text-sm font-medium text-emerald-700">
                Email Notifications
              </span>
              <button className="relative inline-flex items-center h-6 transition-colors rounded-full w-11 bg-emerald-600">
                <span className="inline-block w-4 h-4 transition-transform transform translate-x-6 bg-white rounded-full" />
              </button>
            </div>
            <button className="w-full px-4 py-2 text-sm text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
