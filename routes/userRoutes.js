// routes/userRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import {
  getUser,
  updateUser,
  updatePassword,
  uploadProfilePicture,
  requestEmailUpdate,
  verifyEmailUpdate,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../utils/upload.js";

const router = express.Router();

// إعداد معدل التحديد لتحديث كلمة المرور (3 محاولات خلال 15 دقيقة)
const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 50, // 3 محاولات فقط
  message: { error: "Too many password update attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// تطبيق Rate Limiting على تحديث كلمة المرور
router.put("/update-password", authMiddleware, passwordLimiter, updatePassword);

router.get("/me", authMiddleware, getUser);
router.put("/update", authMiddleware, updateUser);
router.post(
  "/upload-profile-picture",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfilePicture
);
router.post("/request-email-update", authMiddleware, requestEmailUpdate);
router.post("/verify-email-update", authMiddleware, verifyEmailUpdate);
router.delete("/delete-account", authMiddleware, deleteUser);

export default router;
