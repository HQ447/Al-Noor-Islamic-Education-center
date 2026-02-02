// server.js
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth/authRoutes.js";
import connectDB from "./config/connectDB.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import router from "./routes/bookRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import superAdminRouter from "./routes/superAdminRoutes.js";

dotenv.config();

const app = express();

// Database connection
const db_url = process.env.DB_URL;
connectDB(db_url);

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Must come BEFORE routes
// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Explicitly handle preflight
// app.options(
//   "*",
//   cors({
//     origin: "*",
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// ✅ Allowed frontend domains
const allowedOrigins = [
  "https://alnooredu.online",
  "https://www.alnooredu.online",
   //"http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman, server
      const lowerOrigin = origin.toLowerCase();
      const isAllowed = allowedOrigins.some(
        (o) => o.toLowerCase() === lowerOrigin
      );
      if (isAllowed) return callback(null, true);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Preflight requests
app.options("*", cors());

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/super", superAdminRouter);
app.use("/api", router);

// Test route
app.get("/", (req, res) => res.send("Server is running 🚀🚀🚀"));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
