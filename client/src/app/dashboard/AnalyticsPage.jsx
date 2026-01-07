import React, { useEffect, useState } from "react";

const AnalyticsPage = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/analytics/ga-stats`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw {
            message: data.message || "Failed to fetch analytics",
            details: data,
          };
        }
        return data;
      })
      .then((data) => {
        setStats(data.rows || []);
        setLoading(false);
        setError(null);
        setErrorDetails(null);
      })
      .catch((err) => {
        console.error("Analytics fetch error:", err);
        setError(err.message || "Failed to load analytics data");
        setErrorDetails(err.details || null);
        setLoading(false);
      });
  }, [BASE_URL]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Analytics Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold">Error loading analytics</p>
          <p className="text-red-600 text-sm mt-2">{error}</p>
          {errorDetails?.instructions && (
            <div className="mt-4 pt-4 border-t border-red-200">
              <p className="text-red-800 font-semibold text-sm mb-2">
                Setup Instructions:
              </p>
              <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                {errorDetails.instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ul>
            </div>
          )}
          {errorDetails?.path && (
            <p className="text-red-600 text-xs mt-2">
              Expected file path:{" "}
              <code className="bg-red-100 px-1 rounded">
                {errorDetails.path}
              </code>
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((row, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-400 text-sm">
                Date: {row.dimensionValues[0].value}
              </p>
              <p className="text-xl font-semibold text-gray-800">
                Active Users: {row.metricValues[0].value}
              </p>
              <p className="text-gray-600">
                Page Views: {row.metricValues[1].value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
