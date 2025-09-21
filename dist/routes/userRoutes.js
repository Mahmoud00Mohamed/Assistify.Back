"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _userController = require("../controllers/userController.js");
var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware.js"));
var _upload = _interopRequireDefault(require("../utils/upload.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// routes/userRoutes.js

var router = _express["default"].Router();

// إعداد معدل التحديد لتحديث كلمة المرور (3 محاولات خلال 15 دقيقة)
var passwordLimiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  // 15 دقيقة
  max: 50,
  // 3 محاولات فقط
  message: {
    error: "Too many password update attempts. Try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// تطبيق Rate Limiting على تحديث كلمة المرور
router.put("/update-password", _authMiddleware["default"], passwordLimiter, _userController.updatePassword);
router.get("/me", _authMiddleware["default"], _userController.getUser);
router.put("/update", _authMiddleware["default"], _userController.updateUser);
router.post("/upload-profile-picture", _authMiddleware["default"], _upload["default"].single("profileImage"), _userController.uploadProfilePicture);
router.post("/request-email-update", _authMiddleware["default"], _userController.requestEmailUpdate);
router.post("/verify-email-update", _authMiddleware["default"], _userController.verifyEmailUpdate);
router["delete"]("/delete-account", _authMiddleware["default"], _userController.deleteUser);
var _default = exports["default"] = router;