"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestLimiter = exports["default"] = void 0;
var _auth = require("../config/auth.js");
var _TokenBlacklist = _interopRequireDefault(require("../models/TokenBlacklist.js"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // middlewares/authMiddleware.js
// 🛡️ إعداد معدل الحد من الطلبات لكل IP لمنع هجمات DDoS
var requestLimiter = exports.requestLimiter = (0, _expressRateLimit["default"])({
  windowMs: 10 * 60 * 1000,
  // ⏳ 10 دقائق
  max: 1000,
  // الحد الأقصى 100 طلب لكل IP
  message: "🚫 تم تجاوز الحد الأقصى للطلبات، يرجى المحاولة لاحقًا."
});

// 🛡️ قائمة `User-Agent` المشبوهة (يُفضل تحميلها من ملف إعدادات خارجي)
var blockedUserAgents = ["sqlmap", "python-requests", "curl", "wget", "nikto", "nmap", "masscan"];

// 🔍 التحقق من الأنشطة المشبوهة عبر `User-Agent` و `IP`
var detectSuspiciousActivity = function detectSuspiciousActivity(req) {
  var userAgent = req.get("User-Agent") || "Unknown";
  var clientIP = req.ip || req.connection.remoteAddress;
  if (blockedUserAgents.some(function (agent) {
    return userAgent.toLowerCase().includes(agent);
  })) {
    return true;
  }
  return false;
};

// 🛡️ **Middleware المصادقة**
var authMiddleware = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
    var _req$cookies, _req$headers$authoriz, token, isBlacklisted, decoded, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          token = ((_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies.accessToken) || ((_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(" ")[1]);
          console.log("Access Token received:", token ? "Yes" : "No");
          if (token) {
            _context.n = 1;
            break;
          }
          console.log("No token provided in cookies or headers");
          return _context.a(2, res.status(401).json({
            message: "No token provided, access denied."
          }));
        case 1:
          if (!detectSuspiciousActivity(req)) {
            _context.n = 2;
            break;
          }
          console.log("Suspicious activity detected");
          return _context.a(2, res.status(403).json({
            message: "🚫 Suspicious activity detected, access blocked."
          }));
        case 2:
          _context.n = 3;
          return _TokenBlacklist["default"].exists({
            token: token
          });
        case 3:
          isBlacklisted = _context.v;
          if (!isBlacklisted) {
            _context.n = 4;
            break;
          }
          console.log("Token is blacklisted");
          return _context.a(2, res.status(401).json({
            message: "Token is invalid (blacklisted)."
          }));
        case 4:
          decoded = (0, _auth.verifyToken)(token);
          if (decoded) {
            _context.n = 5;
            break;
          }
          console.log("Token verification failed");
          return _context.a(2, res.status(401).json({
            message: "Token is invalid or expired."
          }));
        case 5:
          console.log("Token verified successfully for user:", decoded.userId);
          req.user = decoded;
          next();
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t = _context.v;
          console.log("Error in authMiddleware:", _t.message);
          return _context.a(2, res.status(401).json({
            message: "Token is invalid or expired."
          }));
        case 7:
          return _context.a(2);
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function authMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

//  تصدير الميدل وير
var _default = exports["default"] = authMiddleware;