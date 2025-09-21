"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _argon = _interopRequireDefault(require("argon2"));
var _validator = _interopRequireDefault(require("validator"));
var _Task = _interopRequireDefault(require("./Task.js"));
var _Project = _interopRequireDefault(require("./Project.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // models / user.js
// 🛡️ تعريف مخطط المستخدم
var UserSchema = new _mongoose["default"].Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [_validator["default"].isEmail, "Invalid email format"]
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    maxlength: 30
  },
  isVerified: {
    type: Boolean,
    "default": false
  },
  verificationCode: {
    type: String
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  profilePicture: {
    type: String,
    "default": ""
  },
  newEmail: {
    type: String,
    unique: true,
    sparse: true
  },
  emailVerificationCode: {
    type: String
  },
  refreshToken: {
    type: String
  },
  //  الحقول الجديدة لإدارة تأخير طلبات تغيير البريد الإلكتروني
  emailRequestAttempts: {
    type: Number,
    "default": 0
  },
  // عدد المحاولات
  lastEmailRequestTime: {
    type: Date
  } // آخر وقت لطلب تغيير البريد
}, {
  timestamps: true
});
// 🛡️ Validate username
UserSchema.statics.isValidUsername = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(username) {
    var userId,
      existingUser,
      _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          userId = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
          if (!(username.length < 6)) {
            _context.n = 1;
            break;
          }
          throw new Error(" Username must be at least 6 characters long.");
        case 1:
          if (!(username.length > 30)) {
            _context.n = 2;
            break;
          }
          throw new Error(" Username must be 30 characters or fewer.");
        case 2:
          if (!/\s/.test(username)) {
            _context.n = 3;
            break;
          }
          throw new Error(" Spaces are not allowed in the username.");
        case 3:
          if (/^[a-zA-Z0-9._-]+$/.test(username)) {
            _context.n = 4;
            break;
          }
          throw new Error(" Only English letters, numbers, dots (.), and hyphens (-, _) are allowed.");
        case 4:
          if (/[a-zA-Z]/.test(username)) {
            _context.n = 5;
            break;
          }
          throw new Error(" Username must contain at least two English letters.");
        case 5:
          if (!/[^a-zA-Z0-9._-]/.test(username)) {
            _context.n = 6;
            break;
          }
          throw new Error(" Only English letters are allowed.");
        case 6:
          _context.n = 7;
          return this.findOne({
            username: username
          });
        case 7:
          existingUser = _context.v;
          if (!(existingUser && (!userId || existingUser._id.toString() !== userId))) {
            _context.n = 8;
            break;
          }
          throw new Error(" Username is already taken.");
        case 8:
          return _context.a(2, true);
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

// 🛡️ تحويل الحروف العربية إلى لاتينية
var arabicToEnglishMap = {
  أ: "a",
  ب: "b",
  ت: "t",
  ث: "th",
  ج: "j",
  ح: "h",
  خ: "kh",
  د: "d",
  ذ: "dh",
  ر: "r",
  ز: "z",
  س: "s",
  ش: "sh",
  ص: "s",
  ض: "d",
  ط: "t",
  ظ: "z",
  ع: "a",
  غ: "gh",
  ف: "f",
  ق: "q",
  ك: "k",
  ل: "l",
  م: "m",
  ن: "n",
  ه: "h",
  و: "w",
  ي: "y",
  ء: "a",
  ئ: "y",
  ؤ: "w",
  ى: "a",
  ة: "h"
};
var transliterateArabic = function transliterateArabic(text) {
  return text.split("").map(function (_char) {
    return arabicToEnglishMap[_char] || _char;
  }).join("");
};

// 🛡️ التحقق من قوة كلمة المرور
var isStrongPassword = function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

// 🛡️ قبل حفظ المستخدم - تشفير كلمة المرور وإنشاء اسم المستخدم تلقائيًا
UserSchema.pre("save", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(next) {
    var randomNum, firstName, lastName, generatedUsername;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          if (!(this.isModified("password") && !this.password.startsWith("$argon2id$"))) {
            _context2.n = 2;
            break;
          }
          _context2.n = 1;
          return _argon["default"].hash(this.password);
        case 1:
          this.password = _context2.v;
        case 2:
          if (this.username) {
            _context2.n = 6;
            break;
          }
          randomNum = Math.floor(1000 + Math.random() * 9000);
          firstName = this.firstName.replace(/\s+/g, "");
          lastName = this.lastName.replace(/\s+/g, "");
          if (/[\u0600-\u06FF]/.test(firstName)) firstName = transliterateArabic(firstName);
          if (/[\u0600-\u06FF]/.test(lastName)) lastName = transliterateArabic(lastName);
          firstName = firstName.slice(0, 9);
          lastName = lastName.slice(0, 5);
          generatedUsername = "".concat(firstName, ".").concat(lastName, ".").concat(randomNum);
        case 3:
          _context2.n = 4;
          return _mongoose["default"].models.User.findOne({
            username: generatedUsername
          });
        case 4:
          if (!_context2.v) {
            _context2.n = 5;
            break;
          }
          generatedUsername = "".concat(firstName, ".").concat(lastName, ".").concat(Math.floor(1000 + Math.random() * 9000));
          _context2.n = 3;
          break;
        case 5:
          this.username = generatedUsername;
        case 6:
          next();
        case 7:
          return _context2.a(2);
      }
    }, _callee2, this);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()); //  حذف جميع المهام والمشاريع المرتبطة قبل حذف المستخدم
UserSchema.pre("deleteOne", {
  document: true,
  query: false
}, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(next) {
    var userId, _t;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          userId = this._id;
          _context3.p = 1;
          _context3.n = 2;
          return _Task["default"].deleteMany({
            user: userId
          });
        case 2:
          _context3.n = 3;
          return _Project["default"].deleteMany({
            user: userId
          });
        case 3:
          next(); // استكمال الحذف
          _context3.n = 5;
          break;
        case 4:
          _context3.p = 4;
          _t = _context3.v;
          next(_t);
        case 5:
          return _context3.a(2);
      }
    }, _callee3, this, [[1, 4]]);
  }));
  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

// 🛡️ مقارنة كلمة المرور باستخدام Argon2
UserSchema.methods.comparePassword = function (password) {
  return _argon["default"].verify(this.password, password);
};

// 🛡️ التحقق من وجود البريد الإلكتروني أو اسم المستخدم
UserSchema.statics.emailExists = function (email) {
  return this.exists({
    email: email.toLowerCase()
  });
};
UserSchema.statics.usernameExists = function (username) {
  return this.exists({
    username: username
  });
};

// 🛡️ إنشاء نموذج المستخدم وتصديره
var User = _mongoose["default"].model("User", UserSchema);
var _default = exports["default"] = User;