"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//  routes/board.js

var router = _express["default"].Router();
router.get("/dashboard", _authMiddleware["default"], function (req, res) {
  res.json({
    message: "Welcome to the dashboard",
    user: req.user
  });
});
var _default = exports["default"] = router;