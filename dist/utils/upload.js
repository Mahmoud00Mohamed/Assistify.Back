"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//  utils/upload.js

var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/"); // تأكد أن هذا المسار صحيح وموجود
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + _path["default"].extname(file.originalname)); // إضافة الامتداد الصحيح للصورة
  }
});
var fileFilter = function fileFilter(req, file, cb) {
  var allowedTypes = /jpeg|jpg|png/;
  var extname = allowedTypes.test(_path["default"].extname(file.originalname).toLowerCase());
  var mimetype = allowedTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpeg, jpg, png)"));
  }
};
var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter
});
var _default = exports["default"] = upload;