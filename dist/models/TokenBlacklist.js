"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//  /models/TokenBlacklist.js

var TokenBlacklistSchema = new _mongoose["default"].Schema({
  token: {
    type: String,
    required: !0,
    unique: !0
  },
  expiresAt: {
    type: Date,
    required: !0
  }
});
TokenBlacklistSchema.index({
  expiresAt: 1
}, {
  expireAfterSeconds: 0
});
var TokenBlacklist = _mongoose["default"].model("TokenBlacklist", TokenBlacklistSchema);
var _default = exports["default"] = TokenBlacklist;