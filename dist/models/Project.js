"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// models / Project.js

var taskSchema = new _mongoose["default"].Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  assigned: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    "enum": ["pending", "in-progress", "completed", "on-hold", "cancelled", "overdue", "not-started"],
    "default": "pending"
  }
});
var projectSchema = new _mongoose["default"].Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    "enum": ["pending", "in-progress", "completed", "on-hold", "cancelled", "overdue", "not-started"],
    "default": "pending"
  },
  tasks: [taskSchema],
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  } // ربط المشروع بالمستخدم
});
var Project = _mongoose["default"].model("Project", projectSchema);
var _default = exports["default"] = Project;