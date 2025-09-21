"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _url = require("url");
var _path = _interopRequireWildcard(require("path"));
var _db = _interopRequireDefault(require("./config/db.js"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));
var _taskRoutes = _interopRequireDefault(require("./routes/taskRoutes.js"));
var _projectRoutes = _interopRequireDefault(require("./routes/projectRoutes.js"));
var _passport = _interopRequireDefault(require("./config/passport.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = (0, _path.dirname)(_filename);
var app = (0, _express["default"])();

// نقطة نهاية لـ UptimeRobot بدون قيود CORS
app.get("/ping", function (req, res) {
  res.status(200).send("OK");
});

// ميدلوير للسماح لـ Lighthouse وGooglebot
app.use(function (req, res, next) {
  var userAgent = req.headers["user-agent"] || "";
  if (userAgent.includes("Lighthouse") || userAgent.includes("Googlebot")) {
    return next();
  }
  next();
});

// تفعيل trust proxy لدعم البروكسي مثل Render
app.set("trust proxy", 1);

// الاتصال بقاعدة البيانات
(0, _db["default"])();

// دعم الكوكيز
app.use((0, _cookieParser["default"])());

// تطبيق Helmet لتحسين الأمان
app.use((0, _helmet["default"])({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://trusted.cdn.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"]
    }
  },
  xFrameOptions: {
    action: "sameorigin"
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false
}));

// تطبيق CORS
app.use((0, _cors["default"])({
  origin: function origin(_origin, callback) {
    if (!_origin || _origin.endsWith("assistify.site")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Rate Limiting
var limiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  max: function max(req) {
    return req.user ? 1000 : 100;
  },
  message: "🚨 The maximum request limit has been exceeded, try again later."
});
app.use(limiter);

// ميدلوير لتحليل JSON وخدمة الملفات الثابتة
app.use(_express["default"].json());
app.use("/uploads", _express["default"]["static"](_path["default"].join(_dirname, "uploads")));
app.use(_express["default"]["static"]("public"));

// تهيئة Passport
app.use(_passport["default"].initialize());

// الروابط (Routes)
app.use("/api/auth", _authRoutes["default"]);
app.use("/api/user", _userRoutes["default"]);
app.use("/api", _taskRoutes["default"]);
app.use("/api/projects", _projectRoutes["default"]);

// تشغيل الخادم
var PORT = process.env.PORT || 3002;
app.listen(PORT, "0.0.0.0", function () {
  console.log("\uD83D\uDE80 Server running on port ".concat(PORT));
});