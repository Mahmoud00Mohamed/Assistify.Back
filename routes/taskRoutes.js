// routes /taskRoutes.js
import express from "express";
import {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/tasks").post(createTask).get(getUserTasks);

router.route("/tasks/:taskId").put(updateTask).delete(deleteTask);

export default router;
