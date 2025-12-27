import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      localStorage.setItem("Reset_email", email); // ✅ moved here

      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log("OTP sent");
        navigate("/otp");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden md:p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-32 h-32 transform rotate-45 border-4 rounded-full top-10 left-10 border-emerald-600"></div>
        <div className="absolute w-24 h-24 border-4 border-teal-600 rounded-full top-20 right-20"></div>
        <div className="absolute transform border-4 border-green-600 rounded-full bottom-20 left-20 w-28 h-28 rotate-12"></div>
        <div className="absolute transform border-4 rounded-full bottom-10 right-10 w-36 h-36 border-emerald-600 -rotate-12"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Islamic Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full shadow-lg bg-gradient-to-br from-emerald-600 to-teal-700">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold md:text-3xl text-emerald-800">
            Forgot Password
          </h1>
          <p className="text-sm text-emerald-600">
            Reset your account password
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 border shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl md:p-8 border-emerald-100"
        >
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-bold md:text-2xl text-emerald-800">
              Password Recovery
            </h2>
            <p className="text-sm text-emerald-600">
              Enter your email to receive OTP
            </p>
          </div>

          {error && (
            <div className="p-4 mb-6 border border-red-200 bg-red-50 rounded-xl">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-emerald-700 md:text-base">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 transition-all duration-300 border-2 placeholder:text-sm md:py-4 border-emerald-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 bg-white/80 text-emerald-800 placeholder-emerald-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-sm py-2 md:py-4 text-white font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="flex items-center justify-center">
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
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
                  Sending OTP...
                </>
              ) : (
                <>
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Send OTP
                </>
              )}
            </span>
          </button>

          <div className="mt-6 text-center">
            <Link
              className="inline-flex items-center text-sm font-medium transition-colors duration-200 text-emerald-600 hover:text-emerald-800"
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
          <div className="inline-flex items-center text-sm text-emerald-600">
            <div className="w-8 h-px mr-3 bg-emerald-300"></div>
            <span className="font-semibold">Secure Password Reset</span>
            <div className="w-8 h-px ml-3 bg-emerald-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
