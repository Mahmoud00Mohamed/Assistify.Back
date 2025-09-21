"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _authController = require("../controllers/authController.js");
var _passport = _interopRequireDefault(require("../config/passport.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//  routes/authRoutes.js

var router = _express["default"].Router();

// إعداد معدل التحديد للمسارات الحساسة (5 محاولات خلال 15 دقيقة)
var authLimiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  // 15 دقيقة
  max: 5000,
  // عدد المحاولات القصوى
  message: {
    error: "Too many requests. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});
// تطبيق الـ Rate Limiting على المسارات الحساسة
router.post("/signup", authLimiter, _authController.signup);
router.post("/login", authLimiter, _authController.login);
router.post("/password-reset", authLimiter, _authController.requestPasswordReset);
router.post("/verify-email", authLimiter, _authController.verifyEmail);
router.post("/resend-code", authLimiter, _authController.resendCode);
router.get("/check-username", _authController.checkUsername);
router.get("/google", _authController.googleAuth); // بدء عملية تسجيل الدخول بـ Google
router.get("/google/callback", _passport["default"].authenticate("google", {
  session: false,
  failureRedirect: "/login"
}), _authController.googleAuthCallback // رد الاتصال بعد المصادقة
);
// router.get("/ping", ping);
// باقي المسارات بدون Rate Limiting
router.post("/reset-password", _authController.resetPassword);
router.post("/refresh-token", _authController.refreshAccessToken);
router.post("/logout", _authController.logout);
var _default = exports["default"] = router;