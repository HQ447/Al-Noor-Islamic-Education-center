import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const email = localStorage.getItem("Reset_email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const BASE_URL =import.meta.env.VITE_BASE_URL;

    if (password !== confirm) {
      alert("Passwords do not match");
      setLoading(false); // Stop loading
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log("Password reset");
        localStorage.removeItem("Reset_email"); // cleanup
        setLoading(false); // Stop loading
        navigate("/admin-Login");
      } else {
        setLoading(false); // Stop loading
        alert(data.message || "Reset failed");
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      alert("Network error. Please try again.", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden md:p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      {/* Islamic Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-48 h-48 transform rotate-45 border-4 border-green-600 top-20 left-20">
          <div className="w-full h-full transform rotate-45 border-4 border-emerald-600">
            <div className="w-full h-full transform rotate-45 border-4 border-teal-600"></div>
          </div>
        </div>
        <div className="absolute w-32 h-32 border-4 rounded-full top-40 right-20 border-emerald-600"></div>
        <div className="absolute w-40 h-40 transform border-4 border-teal-600 bottom-20 left-40 -rotate-12"></div>
        <div className="absolute transform border-4 border-green-600 rounded-full bottom-40 right-32 w-36 h-36 rotate-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Islamic Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full shadow-lg bg-gradient-to-br from-green-600 to-emerald-700">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1L16.09 6.26L22 7L17.74 12L22 17L16.09 15.74L12 23L7.91 15.74L2 17L6.26 12L2 7L7.91 6.26L12 1Z" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-green-800 md:text-3xl">
            Reset Password
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 border border-green-100 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl md:p-8"
        >
          <div className="mb-6 text-center">
            <p className="mb-2 font-bold text-green-800 ">
              Create a new secure password
            </p>

            {email && (
              <p className="inline-block px-3 py-1 mt-2 text-xs rounded-lg text-emerald-700 bg-emerald-50">
                📧 {email}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-green-700 md:text-base">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 pr-12 text-green-800 placeholder-green-400 transition-all duration-300 border-2 border-green-200 placeholder:text-sm md:py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 bg-white/80"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-green-700 md:text-base">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full px-4 py-2 pr-12 text-green-800 placeholder-green-400 transition-all duration-300 border-2 border-green-200 placeholder:text-sm md:py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 bg-white/80"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm new password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirm(!showConfirm)}
                disabled={loading}
              >
                {showConfirm ? (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {password && confirm && password !== confirm && (
              <p className="mt-2 text-xs text-red-500">
                Passwords do not match
              </p>
            )}
            {password && confirm && password === confirm && (
              <p className="flex items-center mt-2 text-xs text-green-600">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Passwords match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!password || !confirm || password !== confirm || loading}
            className="w-full py-2 text-sm md:py-4 text-white font-semibold bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center justify-center">
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
                Resetting Password...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Reset Password
              </span>
            )}
          </button>

          <div className="mt-6 text-center">
            <Link
              className="inline-flex items-center text-sm font-medium text-green-600 transition-colors duration-200 hover:text-green-800"
              to={"/admin-Login"}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Login
            </Link>
          </div>
        </form>

        {/* Islamic Footer Pattern */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-sm text-green-600">
            <div className="w-8 h-px mr-3 bg-green-300"></div>
            <span className="font-arabic">والله أعلم</span>
            <div className="w-8 h-px ml-3 bg-green-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
