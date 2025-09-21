"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// models / Task.js

var taskSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 10000
  },
  completed: {
    type: Boolean,
    "default": false
  },
  dueDate: {
    type: Date
  },
  tags: {
    type: [String],
    "default": []
  },
  tagsStatus: {
    type: [Boolean],
    "default": []
  },
  progress: {
    type: Number,
    "default": 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true,
  versionKey: false
} //  تعطيل __v
);
var _default = exports["default"] = _mongoose["default"].model("Task", taskSchema);