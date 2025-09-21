"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyEmailUpdate = exports.uploadProfilePicture = exports.updateUser = exports.updatePassword = exports.requestEmailUpdate = exports.getUser = exports.deleteUser = void 0;
var _User = _interopRequireDefault(require("../models/User.js"));
var _argon = _interopRequireDefault(require("argon2"));
var _sendEmail = _interopRequireDefault(require("../utils/sendEmail.js"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _Task = _interopRequireDefault(require("../models/Task.js"));
var _Project = _interopRequireDefault(require("../models/Project.js"));
var _TokenBlacklist = _interopRequireDefault(require("../models/TokenBlacklist.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // controllers/userController.js
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var user, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return _User["default"].findById(req.user.userId).select("-password -refreshToken");
        case 1:
          user = _context.v;
          if (user) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(404).json({
            message: "User not found."
          }));
        case 2:
          res.status(200).json(user);
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          res.status(400).json({
            message: _t.message
          });
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function getUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body, firstName, lastName, username, user, userResponse, _t2, _t3;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, username = _req$body.username;
          _context2.p = 1;
          _context2.n = 2;
          return _User["default"].findById(req.user.userId);
        case 2:
          user = _context2.v;
          if (user) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: "User not found."
          }));
        case 3:
          if (firstName) user.firstName = firstName;
          if (lastName) user.lastName = lastName;
          if (!(username && username !== user.username)) {
            _context2.n = 8;
            break;
          }
          _context2.p = 4;
          _context2.n = 5;
          return _User["default"].isValidUsername(username);
        case 5:
          _context2.n = 7;
          break;
        case 6:
          _context2.p = 6;
          _t2 = _context2.v;
          return _context2.a(2, res.status(400).json({
            message: _t2.message
          }));
        case 7:
          user.username = username;
        case 8:
          _context2.n = 9;
          return user.save();
        case 9:
          userResponse = user.toObject();
          delete userResponse.password;
          delete userResponse.refreshToken;
          res.status(200).json({
            message: "User updated successfully.",
            user: userResponse
          });
          _context2.n = 11;
          break;
        case 10:
          _context2.p = 10;
          _t3 = _context2.v;
          res.status(400).json({
            message: _t3.message
          });
        case 11:
          return _context2.a(2);
      }
    }, _callee2, null, [[4, 6], [1, 10]]);
  }));
  return function updateUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var uploadProfilePicture = exports.uploadProfilePicture = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var user, oldImagePath, _t4;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return _User["default"].findById(req.user.userId);
        case 1:
          user = _context3.v;
          if (user) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: "User not found."
          }));
        case 2:
          if (user.profilePicture) {
            oldImagePath = _path["default"].join(_dirname, "../", user.profilePicture);
            if (_fs["default"].existsSync(oldImagePath)) {
              _fs["default"].unlinkSync(oldImagePath);
            }
          }
          if (!req.file) {
            _context3.n = 5;
            break;
          }
          if (req.file.mimetype.startsWith("image/")) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: "Only image files are allowed."
          }));
        case 3:
          user.profilePicture = req.file.path.replace(/\\/g, "/");
          _context3.n = 4;
          return user.save();
        case 4:
          res.status(200).json({
            message: "Profile picture uploaded successfully.",
            profilePicture: user.profilePicture
          });
          _context3.n = 6;
          break;
        case 5:
          res.status(400).json({
            message: "No file uploaded."
          });
        case 6:
          _context3.n = 8;
          break;
        case 7:
          _context3.p = 7;
          _t4 = _context3.v;
          res.status(500).json({
            message: "Error uploading profile picture.",
            error: _t4.message
          });
        case 8:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function uploadProfilePicture(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updatePassword = exports.updatePassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body2, oldPassword, newPassword, user, isMatch, _t5;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _req$body2 = req.body, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword;
          _context4.p = 1;
          _context4.n = 2;
          return _User["default"].findById(req.user.userId);
        case 2:
          user = _context4.v;
          if (user) {
            _context4.n = 3;
            break;
          }
          return _context4.a(2, res.status(404).json({
            error: "User not found."
          }));
        case 3:
          if (!(newPassword.length < 6)) {
            _context4.n = 4;
            break;
          }
          return _context4.a(2, res.status(400).json({
            error: "Password must be at least 6 characters long."
          }));
        case 4:
          _context4.n = 5;
          return _argon["default"].verify(user.password, oldPassword);
        case 5:
          isMatch = _context4.v;
          if (isMatch) {
            _context4.n = 6;
            break;
          }
          return _context4.a(2, res.status(400).json({
            error: "The old password is incorrect."
          }));
        case 6:
          _context4.n = 7;
          return _argon["default"].hash(newPassword);
        case 7:
          user.password = _context4.v;
          _context4.n = 8;
          return user.save();
        case 8:
          res.status(200).json({
            message: "Password updated successfully."
          });
          _context4.n = 10;
          break;
        case 9:
          _context4.p = 9;
          _t5 = _context4.v;
          res.status(500).json({
            error: "An unexpected error occurred while updating the password. Please try again later."
          });
        case 10:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 9]]);
  }));
  return function updatePassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var requestEmailUpdate = exports.requestEmailUpdate = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var newEmail, user, existingUser, attemptDelays, maxAttempts, now, lastAttemptTime, attempts, delay, remainingTime, _t6;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          newEmail = req.body.newEmail;
          _context5.p = 1;
          _context5.n = 2;
          return _User["default"].findById(req.user.userId);
        case 2:
          user = _context5.v;
          if (user) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, res.status(404).json({
            message: "User not found."
          }));
        case 3:
          if (!(!newEmail || newEmail === user.email)) {
            _context5.n = 4;
            break;
          }
          return _context5.a(2, res.status(400).json({
            message: "Invalid new email."
          }));
        case 4:
          _context5.n = 5;
          return _User["default"].findOne({
            email: newEmail
          });
        case 5:
          existingUser = _context5.v;
          if (!existingUser) {
            _context5.n = 6;
            break;
          }
          return _context5.a(2, res.status(400).json({
            message: "Email is already in use."
          }));
        case 6:
          attemptDelays = [0, 60, 60, 900, 3600];
          maxAttempts = attemptDelays.length;
          now = new Date();
          if (!user.lastEmailRequestTime) {
            _context5.n = 7;
            break;
          }
          lastAttemptTime = new Date(user.lastEmailRequestTime);
          attempts = user.emailRequestAttempts;
          delay = attemptDelays[Math.min(attempts, maxAttempts - 1)] * 1000;
          if (!(now - lastAttemptTime < delay)) {
            _context5.n = 7;
            break;
          }
          remainingTime = Math.ceil((delay - (now - lastAttemptTime)) / 1000);
          return _context5.a(2, res.status(429).json({
            message: "Please wait ".concat(remainingTime, " seconds before trying again.")
          }));
        case 7:
          user.emailVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
          user.newEmail = newEmail;
          user.emailRequestAttempts = Math.min(user.emailRequestAttempts + 1, maxAttempts);
          user.lastEmailRequestTime = now;
          _context5.n = 8;
          return user.save();
        case 8:
          _context5.n = 9;
          return (0, _sendEmail["default"])({
            to: newEmail,
            subject: "🔄 Email Update",
            type: "emailUpdate",
            data: {
              code: user.emailVerificationCode
            }
          });
        case 9:
          res.status(200).json({
            message: "The verification code has been sent to the new email."
          });
          _context5.n = 11;
          break;
        case 10:
          _context5.p = 10;
          _t6 = _context5.v;
          res.status(500).json({
            message: _t6.message
          });
        case 11:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 10]]);
  }));
  return function requestEmailUpdate(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var verifyEmailUpdate = exports.verifyEmailUpdate = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _req$body3, verificationCode, password, user, isPasswordValid, _t7;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _req$body3 = req.body, verificationCode = _req$body3.verificationCode, password = _req$body3.password;
          _context6.p = 1;
          _context6.n = 2;
          return _User["default"].findById(req.user.userId);
        case 2:
          user = _context6.v;
          if (user) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2, res.status(404).json({
            message: "User not found."
          }));
        case 3:
          if (user.newEmail) {
            _context6.n = 4;
            break;
          }
          return _context6.a(2, res.status(400).json({
            message: "No email update requested."
          }));
        case 4:
          if (!(user.emailVerificationCode !== verificationCode)) {
            _context6.n = 5;
            break;
          }
          return _context6.a(2, res.status(400).json({
            message: "Invalid verification code."
          }));
        case 5:
          _context6.n = 6;
          return _argon["default"].verify(user.password, password);
        case 6:
          isPasswordValid = _context6.v;
          if (isPasswordValid) {
            _context6.n = 7;
            break;
          }
          return _context6.a(2, res.status(400).json({
            message: "Incorrect password."
          }));
        case 7:
          user.email = user.newEmail;
          user.newEmail = undefined;
          user.emailVerificationCode = undefined;
          user.googleId = undefined; // حذف googleId عند تغيير البريد الإلكتروني
          _context6.n = 8;
          return user.save();
        case 8:
          res.status(200).json({
            message: "Email updated successfully."
          });
          _context6.n = 10;
          break;
        case 9:
          _context6.p = 9;
          _t7 = _context6.v;
          res.status(500).json({
            message: _t7.message
          });
        case 10:
          return _context6.a(2);
      }
    }, _callee6, null, [[1, 9]]);
  }));
  return function verifyEmailUpdate(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var userId, _req$body4, password, confirmation, user, isPasswordValid, profilePicPath, _t8;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          userId = req.user.userId;
          _req$body4 = req.body, password = _req$body4.password, confirmation = _req$body4.confirmation;
          if (!(confirmation !== "DELETE")) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2, res.status(400).json({
            message: " You must type 'DELETE' to confirm."
          }));
        case 1:
          _context7.n = 2;
          return _User["default"].findById(userId);
        case 2:
          user = _context7.v;
          if (user) {
            _context7.n = 3;
            break;
          }
          return _context7.a(2, res.status(404).json({
            message: " User not found."
          }));
        case 3:
          _context7.n = 4;
          return _argon["default"].verify(user.password, password);
        case 4:
          isPasswordValid = _context7.v;
          if (isPasswordValid) {
            _context7.n = 5;
            break;
          }
          return _context7.a(2, res.status(401).json({
            message: " Incorrect password."
          }));
        case 5:
          _context7.n = 6;
          return _Task["default"].deleteMany({
            $or: [{
              user: userId
            }, {
              createdBy: userId
            }, {
              assignedTo: userId
            }]
          });
        case 6:
          _context7.n = 7;
          return _Project["default"].deleteMany({
            user: userId
          });
        case 7:
          _context7.n = 8;
          return _TokenBlacklist["default"].deleteMany({
            user: userId
          });
        case 8:
          // 🖼️ حذف صورة الملف الشخصي إذا كانت موجودة
          if (user.profilePicture) {
            profilePicPath = _path["default"].join("/backend/uploads", user.profilePicture);
            if (_fs["default"].existsSync(profilePicPath)) {
              _fs["default"].unlinkSync(profilePicPath);
            }
          }

          // 🗑️ حذف الحساب من قاعدة البيانات
          _context7.n = 9;
          return _User["default"].findByIdAndDelete(userId);
        case 9:
          // 🧹 مسح جميع الكوكيز
          Object.keys(req.cookies).forEach(function (cookieName) {
            res.clearCookie(cookieName, {
              expires: new Date(0),
              httpOnly: true,
              secure: true,
              sameSite: "Strict"
            });
          });

          // 🧹 إجبار المتصفح على مسح الكوكيز
          res.setHeader("Set-Cookie", ["sessionToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT", "refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT"]);
          res.json({
            message: " Account and all associated data have been successfully deleted."
          });
          _context7.n = 11;
          break;
        case 10:
          _context7.p = 10;
          _t8 = _context7.v;
          res.status(500).json({
            message: " An error occurred while deleting the account."
          });
        case 11:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function deleteUser(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();