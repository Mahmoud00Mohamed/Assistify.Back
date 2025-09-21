"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _taskController = require("../controllers/taskController.js");
var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// routes /taskRoutes.js

var router = _express["default"].Router();
router.use(_authMiddleware["default"]);
router.route("/tasks").post(_taskController.createTask).get(_taskController.getUserTasks);
router.route("/tasks/:taskId").put(_taskController.updateTask)["delete"](_taskController.deleteTask);
var _default = exports["default"] = router;