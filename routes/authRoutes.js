//  routes/authRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import {
  signup,
  verifyEmail,
  login,
  requestPasswordReset,
  resetPassword,
  resendCode,
  refreshAccessToken,
  logout,
  checkUsername,
} from "../controllers/authController.js";
import passport from "../config/passport.js";
import {
  googleAuth,
  googleAuthCallback,
} from "../controllers/authController.js";
const router = express.Router();

// إعداد معدل التحديد للمسارات الحساسة (5 محاولات خلال 15 دقيقة)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 5000, // عدد المحاولات القصوى
  message: { error: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
// تطبيق الـ Rate Limiting على المسارات الحساسة
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/password-reset", authLimiter, requestPasswordReset);
router.post("/verify-email", authLimiter, verifyEmail);
router.post("/resend-code", authLimiter, resendCode);
router.get("/check-username", checkUsername);
router.get("/google", googleAuth); // بدء عملية تسجيل الدخول بـ Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleAuthCallback // رد الاتصال بعد المصادقة
);
// باقي المسارات بدون Rate Limiting
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

export default router;
