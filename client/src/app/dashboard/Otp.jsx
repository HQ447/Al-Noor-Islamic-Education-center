import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("Reset_email");

  useEffect(() => {
    if (!email) navigate("/forgot");
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log("OTP verified");
        navigate("/reset");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-green-100">
      {/* Islamic Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-40 h-40 transform rotate-45 border-4 border-teal-600 top-16 left-16">
          <div className="w-full h-full transform rotate-45 border-4 border-emerald-600"></div>
        </div>
        <div className="absolute w-32 h-32 border-4 border-green-600 rounded-full top-32 right-16"></div>
        <div className="absolute transform border-4 border-teal-600 bottom-16 left-32 w-36 h-36 rotate-12">
          <div className="w-full h-full transform border-4 border-emerald-600 -rotate-12"></div>
        </div>
        <div className="absolute transform rotate-45 border-4 border-green-600 rounded-full bottom-32 right-20 w-28 h-28"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Islamic Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full shadow-lg bg-gradient-to-br from-teal-600 to-emerald-700">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1L15.09 6.26L21 7L16.74 12L21 17L15.09 15.74L12 22L8.91 15.74L3 17L7.26 12L3 7L8.91 6.26L12 1Z" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-teal-800 md:text-3xl">
            OTP Verification
          </h1>
          <p className="text-sm text-teal-600">Verify your identity</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 border border-teal-100 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl md:p-8"
        >
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-bold text-teal-800 md:text-2xl">
              Enter Verification Code
            </h2>
            <p className="text-sm text-teal-600">
              Enter the OTP sent to your email
            </p>
            {email && (
              <p className="inline-block px-3 py-1 mt-2 text-xs rounded-lg text-emerald-700 bg-emerald-50">
                📧 {email}
              </p>
            )}
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
            <label className="block mb-2 text-sm font-semibold text-teal-700 md:text-base">
              Enter OTP
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 font-mono text-lg tracking-widest text-center text-teal-800 placeholder-teal-400 transition-all duration-300 border-2 border-teal-200 md:py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 bg-white/80"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                maxLength={6}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-teal-500"
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
              </div>
            </div>
            <p className="mt-2 text-xs text-center text-teal-500">
              Please enter the 6-digit code sent to your email
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-sm md:py-4 text-white font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                  Verifying OTP...
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Verify OTP
                </>
              )}
            </span>
          </button>

          <div className="mt-6 space-y-3 text-center">
            <button
              type="button"
              className="text-sm font-medium transition-colors duration-200 text-emerald-600 hover:text-emerald-800"
              onClick={() => {
                // Add resend OTP functionality here if needed
                alert("Resend OTP functionality can be added here");
              }}
            >
              Didn't receive OTP? Resend
            </button>

            <div>
              <Link
                className="inline-flex items-center text-sm font-medium text-teal-600 transition-colors duration-200 hover:text-teal-800"
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
          </div>
        </form>

        {/* Islamic Footer Pattern */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-sm text-teal-600">
            <div className="w-8 h-px mr-3 bg-teal-300"></div>
            <span className="font-semibold">Secure Verification</span>
            <div className="w-8 h-px ml-3 bg-teal-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
