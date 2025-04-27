import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import path from "path";
import passport from "./config/passport.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// نقطة نهاية لـ UptimeRobot بدون قيود CORS
app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

// ميدلوير للسماح لـ Lighthouse وGooglebot
app.use((req, res, next) => {
  const userAgent = req.headers["user-agent"] || "";
  if (userAgent.includes("Lighthouse") || userAgent.includes("Googlebot")) {
    return next();
  }
  next();
});

// تفعيل trust proxy لدعم البروكسي مثل Render
app.set("trust proxy", 1);

// الاتصال بقاعدة البيانات
connectDB();

// دعم الكوكيز
app.use(cookieParser());

// تطبيق Helmet لتحسين الأمان
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://trusted.cdn.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
      },
    },
    xFrameOptions: { action: "sameorigin" },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// تطبيق CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.endsWith("assistify.site")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req) => (req.user ? 1000 : 100),
  message: "🚨 The maximum request limit has been exceeded, try again later.",
});
app.use(limiter);

// ميدلوير لتحليل JSON وخدمة الملفات الثابتة
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));

// تهيئة Passport
app.use(passport.initialize());

// الروابط (Routes)
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", taskRoutes);
app.use("/api/projects", projectRoutes);

// تشغيل الخادم
const PORT = process.env.PORT || 3002;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
