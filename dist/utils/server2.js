// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import connectDB from "../config/db.js";
// import authRoutes from "../routes/authRoutes.js";
// import userRoutes from "../routes/userRoutes.js";
// import taskRoutes from "../routes/taskRoutes.js";
// import projectRoutes from "../routes/projectRoutes.js";
// import path from "path";
// import passport from "../config/passport.js";
// import https from "https";
// import fs from "fs";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const sslOptions = {
//   key: fs.readFileSync(path.join(__dirname, "/sslOptions/127.0.0.1+2-key.pem")),
//   cert: fs.readFileSync(path.join(__dirname, "/sslOptions/127.0.0.1+2.pem")),
// };

// const app = express();

// app.use((req, res, next) => {
//   const userAgent = req.headers["user-agent"] || "";
//   if (userAgent.includes("Lighthouse") || userAgent.includes("Googlebot")) {
//     return next();
//   }
//   next();
// });

// app.set("trust proxy", 1);

// connectDB();

// app.use(cookieParser());

// // إعداد CORS
// const allowedOrigins = [
//   "https://192.168.1.3:3001",
//   "https://localhost:3001",
//   "https://www.assistify.site",
//   "https://assistify.site",
// ];
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("🚫 Access from this source is not allowed"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: (req) => (req.user ? 1000 : 100),
//   message: "🚨 The maximum request limit has been exceeded, try again later.",
// });
// app.use(limiter);

// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.static("public"));
// app.use(passport.initialize());
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api", taskRoutes);
// app.use("/api/projects", projectRoutes);

// const PORT = process.env.PORT || 3002;

// https.createServer(sslOptions, app).listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 HTTPS Server running on port ${PORT}`);
// });
"use strict";