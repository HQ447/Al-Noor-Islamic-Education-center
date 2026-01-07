import express from "express";
import { google } from "googleapis";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Path to your service account key JSON
const KEYFILEPATH = path.join(__dirname, "../google-service-account.json");
const VIEW_ID = "G-NSQC36TS8J"; // GA4 Measurement ID

router.get("/ga-stats", async (req, res) => {
  try {
    let auth;

    // Option 1: Use environment variable (recommended for production)
    if (process.env.GOOGLE_SERVICE_ACCOUNT) {
      try {
        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
        auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
        });
      } catch (parseError) {
        console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT:", parseError);
        return res.status(500).json({
          message: "Invalid GOOGLE_SERVICE_ACCOUNT environment variable",
          error:
            "The service account JSON in environment variable is malformed",
        });
      }
    }
    // Option 2: Use file path
    else if (fs.existsSync(KEYFILEPATH)) {
      auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
      });
    }
    // Neither option available
    else {
      console.error(`Service account file not found at: ${KEYFILEPATH}`);
      return res.status(500).json({
        message: "Google Analytics service account not configured",
        error: "Please set up Google Analytics credentials",
        instructions: [
          "Option 1 (Recommended): Set GOOGLE_SERVICE_ACCOUNT environment variable with your service account JSON",
          `Option 2: Place your service account JSON file at: ${KEYFILEPATH}`,
          "To get credentials: Go to Google Cloud Console > IAM & Admin > Service Accounts > Create/Select service account > Create key (JSON)",
        ],
        path: KEYFILEPATH,
      });
    }

    const analyticsData = google.analyticsdata({
      version: "v1beta",
      auth,
    });

    // GA4 property ID format: properties/123456789
    const propertyId = `properties/${518758193}`;

    const response = await analyticsData.properties.runReport({
      property: propertyId,
      requestBody: {
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
        dateRanges: [
          {
            startDate: "7daysAgo",
            endDate: "today",
          },
        ],
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error("Analytics API Error:", err);
    res.status(500).json({
      message: err.message,
      details: err.response?.data || err.stack,
    });
  }
});

export default router;
