"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mail = _interopRequireDefault(require("@sendgrid/mail"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
_dotenv["default"].config();
_mail["default"].setApiKey(process.env.SENDGRID_API_KEY);
var styles = {
  wrapper: "\n    background: #f4f7fa;\n    padding: 40px 20px;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  ",
  container: "\n    max-width: 600px;\n    margin: 0 auto;\n    background: #ffffff;\n    border-radius: 8px;\n    overflow: hidden;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #e2e8f0;\n  ",
  headerSection: "\n    background: #ffffff;\n    padding: 20px 30px;\n    border-bottom: 1px solid #edf2f7;\n    text-align: center;\n  ",
  logo: "\n    display: block;\n    margin: 0 auto 10px;\n    font-size: 24px;\n    font-weight: 700;\n    color: #2b6cb0;\n    text-decoration: none;\n  ",
  header: "\n    font-size: 20px;\n    font-weight: 600;\n    color: #1a202c;\n    margin: 0;\n  ",
  subheader: "\n    font-size: 14px;\n    color: #718096;\n    margin: 8px 0 0;\n  ",
  content: "\n    padding: 30px;\n    font-size: 15px;\n    line-height: 1.6;\n    color: #4a5568;\n  ",
  code: "\n    display: block;\n    background: #f7fafc;\n    color: #2b6cb0;\n    font-size: 24px;\n    font-weight: 600;\n    padding: 15px;\n    border-radius: 6px;\n    text-align: center;\n    margin: 20px 0;\n    letter-spacing: 2px;\n    border: 1px solid #e2e8f0;\n  ",
  button: "\n    display: inline-block;\n    background: #2b6cb0;\n    color: #ffffff;\n    padding: 12px 32px;\n    text-decoration: none;\n    font-size: 15px;\n    font-weight: 600;\n    border-radius: 6px;\n    transition: background 0.2s ease;\n  ",
  buttonHover: "\n    background: #2c5282;\n  ",
  footer: "\n    background: #f7fafc;\n    padding: 20px 30px;\n    font-size: 12px;\n    color: #718096;\n    text-align: center;\n    border-top: 1px solid #e2e8f0;\n  ",
  link: "\n    color: #2b6cb0;\n    text-decoration: none;\n    font-weight: 500;\n  "
};
var emailTemplates = {
  emailConfirmation: function emailConfirmation(_ref) {
    var code = _ref.code;
    return {
      subject: "Confirm Your Account",
      html: "\n      <div style=\"".concat(styles.wrapper, "\">\n        <div style=\"").concat(styles.container, "\">\n          <div style=\"").concat(styles.headerSection, "\">\n            <a href=\"#\" style=\"").concat(styles.logo, "\">Assistify</a>\n            <div style=\"").concat(styles.header, "\">Welcome to Assistify</div>\n            <div style=\"").concat(styles.subheader, "\">Let\u2019s get you started</div>\n          </div>\n          <div style=\"").concat(styles.content, "\">\n            <p>Hi there,</p>\n            <p>Thanks for joining Assistify! To activate your account, use the code below:</p>\n            <div style=\"").concat(styles.code, "\">").concat(code, "</div>\n            <p>Enter this code on the verification page to complete your setup.</p>\n            <p>If you didn\u2019t sign up, please ignore this email.</p>\n          </div>\n          ").concat(footer(), "\n        </div>\n      </div>\n    ")
    };
  },
  emailUpdate: function emailUpdate(_ref2) {
    var code = _ref2.code;
    return {
      subject: "Confirm Your Email Change",
      html: "\n      <div style=\"".concat(styles.wrapper, "\">\n        <div style=\"").concat(styles.container, "\">\n          <div style=\"").concat(styles.headerSection, "\">\n            <a href=\"#\" style=\"").concat(styles.logo, "\">Assistify</a>\n            <div style=\"").concat(styles.header, "\">Email Update</div>\n            <div style=\"").concat(styles.subheader, "\">Secure your new email</div>\n          </div>\n          <div style=\"").concat(styles.content, "\">\n            <p>Hello,</p>\n            <p>You\u2019ve requested to update your email address. Please confirm with this code:</p>\n            <div style=\"").concat(styles.code, "\">").concat(code, "</div>\n            <p>Use it in the app to finalize the change. If this wasn\u2019t you, contact support immediately.</p>\n          </div>\n          ").concat(footer(), "\n        </div>\n      </div>\n    ")
    };
  },
  passwordReset: function passwordReset(_ref3) {
    var resetLink = _ref3.resetLink;
    return {
      subject: "Reset Your Password",
      html: "\n      <div style=\"".concat(styles.wrapper, "\">\n        <div style=\"").concat(styles.container, "\">\n          <div style=\"").concat(styles.headerSection, "\">\n            <a href=\"#\" style=\"").concat(styles.logo, "\">Assistify</a>\n            <div style=\"").concat(styles.header, "\">Password Reset</div>\n            <div style=\"").concat(styles.subheader, "\">Restore access to your account</div>\n          </div>\n          <div style=\"").concat(styles.content, "\">\n            <p>Hi,</p>\n            <p>Forgot your password? Click below to reset it:</p>\n            <div style=\"text-align: center; margin: 25px 0;\">\n              <a href=\"").concat(resetLink, "\" \n                 style=\"").concat(styles.button, "\"\n                 onmouseover=\"this.style.background='#2c5282'\"\n                 onmouseout=\"this.style.background='#2b6cb0'\">\n                Reset Password\n              </a>\n            </div>\n            <p>This link expires in 15 minutes. If you didn\u2019t request this, please secure your account.</p>\n          </div>\n          ").concat(footer(), "\n        </div>\n      </div>\n    ")
    };
  },
  emailVerification: function emailVerification(_ref4) {
    var code = _ref4.code;
    return {
      subject: "Verify Your Email Address",
      html: "\n      <div style=\"".concat(styles.wrapper, "\">\n        <div style=\"").concat(styles.container, "\">\n          <div style=\"").concat(styles.headerSection, "\">\n            <a href=\"#\" style=\"").concat(styles.logo, "\">Assistify</a>\n            <div style=\"").concat(styles.header, "\">Email Verification</div>\n            <div style=\"").concat(styles.subheader, "\">One step to go</div>\n          </div>\n          <div style=\"").concat(styles.content, "\">\n            <p>Hello,</p>\n            <p>We need to verify your email. Please use this code:</p>\n            <div style=\"").concat(styles.code, "\">").concat(code, "</div>\n            <p>Enter it to activate your account. If this wasn\u2019t you, let us know.</p>\n          </div>\n          ").concat(footer(), "\n        </div>\n      </div>\n    ")
    };
  },
  "default": function _default(_ref5) {
    var text = _ref5.text;
    return {
      subject: "Assistify Notification",
      html: "\n      <div style=\"".concat(styles.wrapper, "\">\n        <div style=\"").concat(styles.container, "\">\n          <div style=\"").concat(styles.headerSection, "\">\n            <a href=\"#\" style=\"").concat(styles.logo, "\">Assistify</a>\n            <div style=\"").concat(styles.header, "\">Update</div>\n            <div style=\"").concat(styles.subheader, "\">Stay informed</div>\n          </div>\n          <div style=\"").concat(styles.content, "\">\n            <p>Hi there,</p>\n            <p>").concat(text || "No specific update available at this time.", "</p>\n          </div>\n          ").concat(footer(), "\n        </div>\n      </div>\n    ")
    };
  }
};
var footer = function footer() {
  return "\n  <div style=\"".concat(styles.footer, "\">\n    <p>Need help? Reach out to <a href=\"mailto:support@assistify.site\" style=\"").concat(styles.link, "\">support@Assistify.com</a></p>\n    <p>\xA9 ").concat(new Date().getFullYear(), " Assistify, Inc. All rights reserved.</p>\n  </div>\n");
};
var sendEmail = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref6) {
    var to, subject, type, data, template, _template, templateSubject, html, mailOptions, response, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          to = _ref6.to, subject = _ref6.subject, type = _ref6.type, data = _ref6.data;
          _context.p = 1;
          template = emailTemplates[type] || emailTemplates["default"];
          _template = template(data), templateSubject = _template.subject, html = _template.html;
          mailOptions = {
            from: "\"Assistify\" <".concat(process.env.EMAIL_FROM, ">"),
            to: to,
            subject: subject || templateSubject,
            html: html,
            trackingSettings: {
              clickTracking: {
                enable: false,
                // تعطيل تتبع النقرات
                enableText: false
              }
            }
          };
          _context.n = 2;
          return _mail["default"].send(mailOptions);
        case 2:
          response = _context.v;
          console.log("Email sent with link:", data.resetLink); // للتحقق
          return _context.a(2, {
            success: true,
            recipient: to
          });
        case 3:
          _context.p = 3;
          _t = _context.v;
          if (_t.response && _t.response.status === 403) {
            console.log("تم تجاوز الحد اليومي للرسائل (100 رسالة). انتظر حتى الغد أو قم بترقية الخطة.");
          }
          throw new Error("Failed to send email: ".concat(_t.message));
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3]]);
  }));
  return function sendEmail(_x) {
    return _ref7.apply(this, arguments);
  };
}();
var _default2 = exports["default"] = sendEmail;