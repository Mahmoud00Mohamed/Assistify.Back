"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _projectController = require("../controllers/projectController.js");
var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// routes /projectRoutes.js

var router = _express["default"].Router();

// 🟢 جلب جميع المشاريع
router.get("/", _authMiddleware["default"], _projectController.getAllProjects);

// 🟢 إضافة مشروع جديد
router.post("/", _authMiddleware["default"], _projectController.createProject);

// 🟢 تحديث مشروع
router.put("/:id", _authMiddleware["default"], _projectController.updateProject);

// 🟢 حذف مشروع
router["delete"]("/:id", _authMiddleware["default"], _projectController.deleteProject);

// 🟢 إضافة مهمة إلى مشروع معين
router.post("/:id/tasks", _authMiddleware["default"], _projectController.addTaskToProject);

// 🟢 حذف مهمة من مشروع معين
router["delete"]("/:id/tasks/:taskId", _authMiddleware["default"], _projectController.deleteTaskFromProject);

// 🟢 تحديث مهمة داخل مشروع
router.put("/:id/tasks/:taskId", _authMiddleware["default"], _projectController.updateTaskInProject);
var _default = exports["default"] = router;