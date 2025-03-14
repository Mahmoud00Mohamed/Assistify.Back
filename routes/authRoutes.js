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
import passport from "../config/auth.js";

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

// باقي المسارات بدون Rate Limiting
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const accessToken = generateAccessToken(req.user._id);
    const refreshToken = generateRefreshToken(req.user._id);

    // حفظ الـ Refresh Token في Redis
    redis.set(
      `refreshToken:${req.user._id}`,
      refreshToken,
      "EX",
      30 * 24 * 60 * 60
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ accessToken, message: "✅ Logged in with Google successfully!" });
  }
);
export default router;
