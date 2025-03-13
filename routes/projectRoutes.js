// routes /projectRoutes.js
import express from "express";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  addTaskToProject,
  deleteTaskFromProject,
  updateTaskInProject,
} from "../controllers/projectController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🟢 جلب جميع المشاريع
router.get("/", authMiddleware, getAllProjects);

// 🟢 إضافة مشروع جديد
router.post("/", authMiddleware, createProject);

// 🟢 تحديث مشروع
router.put("/:id", authMiddleware, updateProject);

// 🟢 حذف مشروع
router.delete("/:id", authMiddleware, deleteProject);

// 🟢 إضافة مهمة إلى مشروع معين
router.post("/:id/tasks", authMiddleware, addTaskToProject);

// 🟢 حذف مهمة من مشروع معين
router.delete("/:id/tasks/:taskId", authMiddleware, deleteTaskFromProject);

// 🟢 تحديث مهمة داخل مشروع
router.put("/:id/tasks/:taskId", authMiddleware, updateTaskInProject);

export default router;
