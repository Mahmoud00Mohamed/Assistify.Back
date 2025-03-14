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
import { OAuth2Client } from "google-auth-library"; // أضف هذا السطر

const router = express.Router();

// إعداد معدل التحديد للمسارات الحساسة
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
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

// مسار جديد للتعامل مع طلب POST من Google Sign-In
router.post("/google", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "No token provided." });
  }

  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        firstName: payload.given_name,
        lastName: payload.family_name || "",
        email: payload.email,
        isVerified: true,
      });
      await user.save();
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, success: true });
  } catch (error) {
    console.error("Google token verification failed:", error);
    res.status(401).json({ message: "Invalid Google token." });
  }
});

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
