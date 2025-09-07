import { useState } from "react";
import { useNavigate } from "react-router";

export default function RegisterAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = `https://noor-ul-quran-backend-gq68.onrender.com`;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, secret, password }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setLoading(false);
        seterrorMessage("");
        navigate("/admin-Login");
      } else {
        seterrorMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      seterrorMessage(error);
      console.error("Registration error:", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-12 overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute w-20 h-20 rounded-full top-10 left-10 bg-emerald-200 opacity-20 animate-pulse"></div>
      <div className="absolute w-16 h-16 delay-1000 bg-green-300 rounded-full bottom-10 right-10 opacity-20 animate-pulse"></div>
      <div className="absolute w-12 h-12 delay-500 bg-teal-200 rounded-full top-1/4 right-20 opacity-20 animate-pulse"></div>
      <div className="absolute delay-700 rounded-full bottom-1/4 left-20 w-14 h-14 bg-emerald-300 opacity-20 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Islamic Geometric Border */}
        <div className="overflow-hidden border shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl border-emerald-100">
          {/* Header with Islamic Pattern */}
          <div className="relative px-8 py-6 bg-gradient-to-r from-emerald-600 to-green-600">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.8'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "40px 40px",
              }}
            ></div>

            {/* Islamic Crescent and Star Symbol */}
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 24 24" className="w-full h-full text-white">
                  <path
                    fill="currentColor"
                    d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                    opacity="0.8"
                  />
                  <path
                    fill="currentColor"
                    d="M9 12C9 16.5 5.5 20 1 20C2.5 20 4 19 5 17.5C6 16 6.5 14 6.5 12C6.5 10 6 8 5 6.5C4 5 2.5 4 1 4C5.5 4 9 7.5 9 12Z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-white">
              Admin Registration
            </h2>
            <p className="mt-1 text-sm text-center text-emerald-100">
              Create Your Sacred Account
            </p>
          </div>

          <div className="p-6 space-y-5 md:p-8">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ali Hamza"
                  className="w-full py-2 pl-12 pr-4 transition-all duration-300 border-2 outline-none md:py-3 placeholder:text-xs border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 bg-white/70 backdrop-blur-sm"
                />
                <div className="absolute transform -translate-y-1/2 left-4 top-1/2 text-emerald-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  className="w-full py-2 pl-12 pr-4 transition-all duration-300 border-2 outline-none md:py-3 placeholder:text-xs border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 bg-white/70 backdrop-blur-sm"
                />
                <div className="absolute transform -translate-y-1/2 left-4 top-1/2 text-emerald-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="secret"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Admin Secret Key
              </label>
              <div className="relative">
                <input
                  id="secret"
                  type="text"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  required
                  placeholder="Enter admin authorization key"
                  className="w-full py-2 pl-12 pr-4 transition-all duration-300 border-2 outline-none md:py-3 placeholder:text-xs border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 bg-white/70 backdrop-blur-sm"
                />
                <div className="absolute transform -translate-y-1/2 left-4 top-1/2 text-emerald-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-.257A6 6 0 1118 8zM2 8a8 8 0 1016 0A8 8 0 002 8zm8-3a3 3 0 100 6 3 3 0 000-6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Choose a secure password"
                  className="w-full py-2 pl-12 pr-4 transition-all duration-300 border-2 outline-none md:py-3 placeholder:text-xs border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 bg-white/70 backdrop-blur-sm"
                />
                <div className="absolute transform -translate-y-1/2 left-4 top-1/2 text-emerald-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder="Re-enter your password"
                  className={` placeholder:text-xs w-full pl-12 pr-4 py-2 md:py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                    !passwordMatch && confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-emerald-200 focus:border-emerald-500 focus:ring-emerald-100"
                  }`}
                />
                <div
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    !passwordMatch && confirmPassword
                      ? "text-red-500"
                      : "text-emerald-500"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {passwordMatch && confirmPassword && (
                  <div className="absolute text-green-500 transform -translate-y-1/2 right-4 top-1/2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {!passwordMatch && confirmPassword && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Passwords do not match
                </p>
              )}
            </div>

            <p className="text-sm text-red-500">{errorMessage}</p>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading || !passwordMatch}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-xl font-semibold text-sm shadow-lg hover:from-emerald-700 hover:to-green-700 focus:ring-4 focus:ring-emerald-200 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-700">
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creating Account...</span>
                </div>
              )}
              <span className={loading ? "opacity-0" : "opacity-100"}>
                Create Admin Account
              </span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-emerald-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/admin-Login")}
                className="inline-flex text-sm items-center justify-center w-full py-3 px-6 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 hover:scale-[1.02] focus:ring-4 focus:ring-emerald-100 bg-transparent cursor-pointer"
              >
                Sign In to Existing Account
              </button>
            </div>
          </div>

          {/* Footer with Islamic blessing */}
          <div className="px-8 py-4 border-t bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-100">
            <p className="text-xs font-medium text-center text-emerald-600">
              May Allah guide your journey • اللَّهُمَّ اهْدِنَا
            </p>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-emerald-600">
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                opacity="0.6"
              />
            </svg>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
