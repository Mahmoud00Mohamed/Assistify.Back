"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyEmail = exports.signup = exports.resetPassword = exports.resendCode = exports.requestPasswordReset = exports.refreshAccessToken = exports.ping = exports.logout = exports.login = exports.googleAuthCallback = exports.googleAuth = exports.checkUsername = void 0;
var _User = _interopRequireDefault(require("../models/User.js"));
var _auth = require("../config/auth.js");
var _sendEmail = _interopRequireDefault(require("../utils/sendEmail.js"));
var _crypto = _interopRequireDefault(require("crypto"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _captchaUtils = require("../utils/captchaUtils.js");
var _redisClient = _interopRequireDefault(require("../config/redisClient.js"));
var _passport = _interopRequireDefault(require("../config/passport.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // controllers/authController.js
// استيراد Passport
_dotenv["default"].config();

// تهيئة تسجيل الدخول بـ Google
var googleAuth = exports.googleAuth = _passport["default"].authenticate("google", {
  scope: ["profile", "email"] // نطاق البيانات المطلوبة من Google
});

// رد الاتصال بعد المصادقة مع Google
var googleAuthCallback = exports.googleAuthCallback = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var user, accessToken, refreshToken, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          user = req.user;
          accessToken = (0, _auth.generateAccessToken)(user._id);
          refreshToken = (0, _auth.generateRefreshToken)(user._id); // تخزين refreshToken في Redis
          _context.n = 1;
          return _redisClient["default"].set("refreshToken:".concat(user._id), refreshToken, "EX", 30 * 24 * 60 * 60);
        case 1:
          // إعداد الكوكيز
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000
          });
          // إعادة التوجيه إلى الواجهة الأمامية مع الـ accessToken
          res.redirect("".concat(process.env.FRONTEND_URL, "/authentication/callback.html?accessToken=").concat(accessToken));
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          res.status(500).json({
            message: " Error during Google authentication."
          });
        case 3:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function googleAuthCallback(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// نقطة نهاية ping للتحقق من حالة الخادم
var ping = exports.ping = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          try {
            res.status(200).json({
              message: "Server is awake"
            });
          } catch (err) {
            res.status(500).json({
              message: "Internal server error."
            });
          }
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function ping(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var signup = exports.signup = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _req$body, firstName, lastName, email, password, captchaToken, verificationCode, user, _t2, _t3, _t4, _t5, _t6, _t7, _t8, _t9;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, captchaToken = _req$body.captchaToken;
          _context3.n = 1;
          return (0, _captchaUtils.verifyCaptcha)(captchaToken);
        case 1:
          if (_context3.v) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: " CAPTCHA verification failed."
          }));
        case 2:
          _context3.p = 2;
          verificationCode = _crypto["default"].randomBytes(3).toString("hex");
          _t2 = _User["default"];
          _t3 = firstName;
          _t4 = lastName;
          _t5 = email;
          _t6 = password;
          _context3.n = 3;
          return (0, _auth.hashPassword)(verificationCode);
        case 3:
          _t7 = _context3.v;
          _t8 = {
            firstName: _t3,
            lastName: _t4,
            email: _t5,
            password: _t6,
            verificationCode: _t7
          };
          user = new _t2(_t8);
          _context3.n = 4;
          return user.save();
        case 4:
          _context3.n = 5;
          return (0, _sendEmail["default"])({
            to: email,
            subject: " Email Confirmation",
            type: "emailConfirmation",
            data: {
              code: verificationCode
            }
          });
        case 5:
          res.status(201).json({
            message: "📩 Account created. Please check your email to verify."
          });
          _context3.n = 7;
          break;
        case 6:
          _context3.p = 6;
          _t9 = _context3.v;
          res.status(400).json({
            message: _t9.message
          });
        case 7:
          return _context3.a(2);
      }
    }, _callee3, null, [[2, 6]]);
  }));
  return function signup(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var login = exports.login = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body2, email, password, captchaToken, user, accessToken, refreshToken, _t0, _t1;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, captchaToken = _req$body2.captchaToken;
          _context4.n = 1;
          return (0, _captchaUtils.verifyCaptcha)(captchaToken);
        case 1:
          if (_context4.v) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, res.status(400).json({
            message: " CAPTCHA verification failed."
          }));
        case 2:
          _context4.p = 2;
          _context4.n = 3;
          return _User["default"].findOne({
            email: email
          });
        case 3:
          user = _context4.v;
          _t0 = !user;
          if (_t0) {
            _context4.n = 5;
            break;
          }
          _context4.n = 4;
          return (0, _auth.verifyPassword)(password, user.password);
        case 4:
          _t0 = !_context4.v;
        case 5:
          if (!_t0) {
            _context4.n = 6;
            break;
          }
          return _context4.a(2, res.status(400).json({
            message: " Invalid login credentials."
          }));
        case 6:
          if (user.isVerified) {
            _context4.n = 7;
            break;
          }
          return _context4.a(2, res.status(403).json({
            message: "⚠️ Account not verified."
          }));
        case 7:
          accessToken = (0, _auth.generateAccessToken)(user._id);
          refreshToken = (0, _auth.generateRefreshToken)(user._id);
          _context4.n = 8;
          return _redisClient["default"].set("refreshToken:".concat(user._id), refreshToken, "EX", 30 * 24 * 60 * 60);
        case 8:
          res.cookie("refreshToken", refreshToken, {
            httpOnly: !0,
            secure: !0,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000
          });
          res.status(200).json({
            accessToken: accessToken
          });
          _context4.n = 10;
          break;
        case 9:
          _context4.p = 9;
          _t1 = _context4.v;
          res.status(400).json({
            message: _t1.message
          });
        case 10:
          return _context4.a(2);
      }
    }, _callee4, null, [[2, 9]]);
  }));
  return function login(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var verifyEmail = exports.verifyEmail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _req$body3, email, verificationCode, user, accessToken, refreshToken, _t10, _t11;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _req$body3 = req.body, email = _req$body3.email, verificationCode = _req$body3.verificationCode;
          _context5.p = 1;
          _context5.n = 2;
          return _User["default"].findOne({
            email: email
          });
        case 2:
          user = _context5.v;
          _t10 = !user;
          if (_t10) {
            _context5.n = 4;
            break;
          }
          _context5.n = 3;
          return (0, _auth.verifyPassword)(verificationCode, user.verificationCode);
        case 3:
          _t10 = !_context5.v;
        case 4:
          if (!_t10) {
            _context5.n = 5;
            break;
          }
          return _context5.a(2, res.status(400).json({
            message: " Invalid verification code."
          }));
        case 5:
          user.isVerified = !0;
          user.verificationCode = undefined;
          _context5.n = 6;
          return user.save();
        case 6:
          accessToken = (0, _auth.generateAccessToken)(user._id);
          refreshToken = (0, _auth.generateRefreshToken)(user._id);
          _context5.n = 7;
          return _redisClient["default"].set("refreshToken:".concat(user._id), refreshToken, "EX", 30 * 24 * 60 * 60);
        case 7:
          res.cookie("refreshToken", refreshToken, {
            httpOnly: !0,
            secure: !0,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000
          });
          res.status(200).json({
            message: " Email successfully verified.",
            accessToken: accessToken
          });
          _context5.n = 9;
          break;
        case 8:
          _context5.p = 8;
          _t11 = _context5.v;
          res.status(400).json({
            message: _t11.message
          });
        case 9:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function verifyEmail(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var requestPasswordReset = exports.requestPasswordReset = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var email, user, resetToken, resetLink, _t12;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          email = req.body.email;
          _context6.p = 1;
          _context6.n = 2;
          return _User["default"].findOne({
            email: email
          });
        case 2:
          user = _context6.v;
          if (user) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2, res.status(400).json({
            message: " User not found."
          }));
        case 3:
          resetToken = (0, _auth.generateAccessToken)(user._id);
          _context6.n = 4;
          return _redisClient["default"].set("resetPassword:".concat(user._id), resetToken, "EX", 10 * 60);
        case 4:
          resetLink = "".concat(process.env.FRONTEND_URL, "/authentication/reset-password?token=").concat(resetToken);
          _context6.n = 5;
          return (0, _sendEmail["default"])({
            to: email,
            subject: "🔒 Password Reset",
            type: "passwordReset",
            data: {
              resetLink: resetLink
            }
          });
        case 5:
          res.status(200).json({
            message: " Reset link sent successfully."
          });
          _context6.n = 7;
          break;
        case 6:
          _context6.p = 6;
          _t12 = _context6.v;
          res.status(400).json({
            message: _t12.message
          });
        case 7:
          return _context6.a(2);
      }
    }, _callee6, null, [[1, 6]]);
  }));
  return function requestPasswordReset(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var resetPassword = exports.resetPassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _req$body4, token, newPassword, _jwt$decode, userId, storedToken, user, _t13;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _req$body4 = req.body, token = _req$body4.token, newPassword = _req$body4.newPassword;
          _context7.p = 1;
          userId = (_jwt$decode = _jsonwebtoken["default"].decode(token)) === null || _jwt$decode === void 0 ? void 0 : _jwt$decode.userId;
          _context7.n = 2;
          return _redisClient["default"].get("resetPassword:".concat(userId));
        case 2:
          storedToken = _context7.v;
          if (!(!storedToken || storedToken !== token)) {
            _context7.n = 3;
            break;
          }
          return _context7.a(2, res.status(400).json({
            message: " The link is invalid or has expired."
          }));
        case 3:
          _context7.n = 4;
          return _User["default"].findById(userId);
        case 4:
          user = _context7.v;
          if (user) {
            _context7.n = 5;
            break;
          }
          return _context7.a(2, res.status(400).json({
            message: " User not found."
          }));
        case 5:
          _context7.n = 6;
          return (0, _auth.hashPassword)(newPassword);
        case 6:
          user.password = _context7.v;
          _context7.n = 7;
          return user.save();
        case 7:
          _context7.n = 8;
          return _redisClient["default"].del("resetPassword:".concat(userId));
        case 8:
          res.status(200).json({
            message: " Password changed successfully."
          });
          _context7.n = 10;
          break;
        case 9:
          _context7.p = 9;
          _t13 = _context7.v;
          res.status(400).json({
            message: _t13.message
          });
        case 10:
          return _context7.a(2);
      }
    }, _callee7, null, [[1, 9]]);
  }));
  return function resetPassword(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var logout = exports.logout = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var refreshToken, decoded, _t14, _t15;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          refreshToken = req.cookies.refreshToken;
          if (refreshToken) {
            _context8.n = 1;
            break;
          }
          return _context8.a(2, res.status(400).json({
            message: "⚠️ No Refresh Token found."
          }));
        case 1:
          _context8.p = 1;
          decoded = _jsonwebtoken["default"].verify(refreshToken, _auth.publicKey, {
            algorithms: ["RS256"]
          });
          _context8.n = 3;
          break;
        case 2:
          _context8.p = 2;
          _t14 = _context8.v;
          return _context8.a(2, res.status(401).json({
            message: " Invalid Refresh Token."
          }));
        case 3:
          _context8.n = 4;
          return _redisClient["default"].del("refreshToken:".concat(decoded.userId));
        case 4:
          res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "None"
          });
          return _context8.a(2, res.status(200).json({
            message: " Logged out successfully!"
          }));
        case 5:
          _context8.p = 5;
          _t15 = _context8.v;
          return _context8.a(2, res.status(500).json({
            message: " Internal server error."
          }));
      }
    }, _callee8, null, [[1, 2], [0, 5]]);
  }));
  return function logout(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
var resendCode = exports.resendCode = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var email, user, verificationCode, _t16;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          email = req.body.email;
          _context9.p = 1;
          _context9.n = 2;
          return _User["default"].findOne({
            email: email
          });
        case 2:
          user = _context9.v;
          if (user) {
            _context9.n = 3;
            break;
          }
          return _context9.a(2, res.status(400).json({
            message: "User not found."
          }));
        case 3:
          verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
          _context9.n = 4;
          return (0, _auth.hashPassword)(verificationCode);
        case 4:
          user.verificationCode = _context9.v;
          _context9.n = 5;
          return user.save();
        case 5:
          _context9.n = 6;
          return (0, _sendEmail["default"])({
            to: email,
            subject: "📧 Email Verification",
            type: "emailVerification",
            data: {
              code: verificationCode
            }
          });
        case 6:
          res.status(200).json({
            message: "Verification code resent."
          });
          _context9.n = 8;
          break;
        case 7:
          _context9.p = 7;
          _t16 = _context9.v;
          res.status(400).json({
            message: _t16.message
          });
        case 8:
          return _context9.a(2);
      }
    }, _callee9, null, [[1, 7]]);
  }));
  return function resendCode(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
var refreshAccessToken = exports.refreshAccessToken = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var refreshToken, decoded, storedToken, newAccessToken, newRefreshToken, _t17, _t18;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          refreshToken = req.cookies.refreshToken;
          console.log("Refresh Token received:", refreshToken ? "Yes" : "No");
          if (refreshToken) {
            _context0.n = 1;
            break;
          }
          console.log("No refresh token found in cookies");
          return _context0.a(2, res.status(400).json({
            message: "⚠️ Refresh Token is required."
          }));
        case 1:
          _context0.p = 1;
          decoded = _jsonwebtoken["default"].verify(refreshToken, _auth.publicKey, {
            algorithms: ["RS256"]
          });
          _context0.n = 3;
          break;
        case 2:
          _context0.p = 2;
          _t17 = _context0.v;
          console.log("Refresh Token verification failed:", _t17.message);
          return _context0.a(2, res.status(401).json({
            message: "Invalid or expired Refresh Token."
          }));
        case 3:
          _context0.n = 4;
          return _redisClient["default"].get("refreshToken:".concat(decoded.userId));
        case 4:
          storedToken = _context0.v;
          if (!(!storedToken || storedToken !== refreshToken)) {
            _context0.n = 5;
            break;
          }
          console.log("Stored token mismatch or not found in Redis");
          return _context0.a(2, res.status(401).json({
            message: "Invalid or expired Refresh Token."
          }));
        case 5:
          newAccessToken = (0, _auth.generateAccessToken)(decoded.userId);
          newRefreshToken = (0, _auth.generateRefreshToken)(decoded.userId);
          _context0.n = 6;
          return _redisClient["default"].set("refreshToken:".concat(decoded.userId), newRefreshToken, "EX", 30 * 24 * 60 * 60);
        case 6:
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000
          });
          console.log("Refresh Token updated successfully");
          return _context0.a(2, res.status(200).json({
            accessToken: newAccessToken
          }));
        case 7:
          _context0.p = 7;
          _t18 = _context0.v;
          console.log("Error in refreshAccessToken:", _t18.message);
          return _context0.a(2, res.status(500).json({
            message: "Internal server error."
          }));
      }
    }, _callee0, null, [[1, 2], [0, 7]]);
  }));
  return function refreshAccessToken(_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}();
var checkUsername = exports.checkUsername = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var _req$query, username, userId, existingUser, _t19;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          _req$query = req.query, username = _req$query.username, userId = _req$query.userId;
          _context1.n = 1;
          return _User["default"].isValidUsername(username);
        case 1:
          _context1.n = 2;
          return _User["default"].findOne({
            username: username
          });
        case 2:
          existingUser = _context1.v;
          if (!existingUser) {
            _context1.n = 4;
            break;
          }
          if (!(existingUser._id.toString() === String(userId))) {
            _context1.n = 3;
            break;
          }
          return _context1.a(2, res.status(200).json({
            available: true,
            message: " Username is available for you."
          }));
        case 3:
          return _context1.a(2, res.status(200).json({
            available: false,
            message: " Username is already taken."
          }));
        case 4:
          return _context1.a(2, res.status(200).json({
            available: true,
            message: " Username is available."
          }));
        case 5:
          _context1.p = 5;
          _t19 = _context1.v;
          return _context1.a(2, res.status(_t19.status || 500).json({
            available: false,
            message: " ".concat(_t19.message || "Internal server error.")
          }));
      }
    }, _callee1, null, [[0, 5]]);
  }));
  return function checkUsername(_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}();