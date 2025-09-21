"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTaskInProject = exports.updateProject = exports.getAllProjects = exports.deleteTaskFromProject = exports.deleteProject = exports.createProject = exports.addTaskToProject = void 0;
var _Project = _interopRequireDefault(require("../models/Project.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // controllers/projectController.js
// 🟢 جلب جميع المشاريع
var getAllProjects = exports.getAllProjects = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var userId, projects, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          userId = req.user.userId;
          _context.n = 1;
          return _Project["default"].find({
            user: userId
          });
        case 1:
          projects = _context.v;
          res.json(projects);
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          res.status(500).json({
            message: _t.message
          });
        case 3:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function getAllProjects(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// 🟢 إضافة مشروع جديد
var createProject = exports.createProject = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body, name, description, startDate, endDate, status, userId, newProject, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _req$body = req.body, name = _req$body.name, description = _req$body.description, startDate = _req$body.startDate, endDate = _req$body.endDate, status = _req$body.status;
          userId = req.user.userId;
          if (name.trim()) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(400).json({
            message: "The project name is required."
          }));
        case 1:
          newProject = new _Project["default"]({
            id: Date.now().toString(),
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            status: status || "pending",
            tasks: [],
            user: userId
          });
          _context2.n = 2;
          return newProject.save();
        case 2:
          res.status(201).json(newProject);
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          res.status(400).json({
            message: _t2.message
          });
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 3]]);
  }));
  return function createProject(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// 🟢 تحديث مشروع
var updateProject = exports.updateProject = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var userId, project, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          userId = req.user.userId;
          _context3.n = 1;
          return _Project["default"].findOne({
            id: req.params.id,
            user: userId
          });
        case 1:
          project = _context3.v;
          if (project) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: "The project does not exist"
          }));
        case 2:
          Object.assign(project, req.body);
          _context3.n = 3;
          return project.save();
        case 3:
          res.json(project);
          _context3.n = 5;
          break;
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          res.status(400).json({
            message: _t3.message
          });
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 4]]);
  }));
  return function updateProject(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// 🟢 حذف مشروع
var deleteProject = exports.deleteProject = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var userId, project, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          userId = req.user.userId;
          _context4.n = 1;
          return _Project["default"].findOneAndDelete({
            id: req.params.id,
            user: userId
          });
        case 1:
          project = _context4.v;
          if (project) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, res.status(404).json({
            message: "The project does not exist"
          }));
        case 2:
          res.json({
            message: "The project has been deleted successfully"
          });
          _context4.n = 4;
          break;
        case 3:
          _context4.p = 3;
          _t4 = _context4.v;
          res.status(500).json({
            message: _t4.message
          });
        case 4:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 3]]);
  }));
  return function deleteProject(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// 🟢 إضافة مهمة إلى مشروع معين
var addTaskToProject = exports.addTaskToProject = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var userId, _req$body2, name, description, assigned, startDate, endDate, status, project, task, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          userId = req.user.userId;
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, assigned = _req$body2.assigned, startDate = _req$body2.startDate, endDate = _req$body2.endDate, status = _req$body2.status;
          _context5.n = 1;
          return _Project["default"].findOne({
            id: req.params.id,
            user: userId
          });
        case 1:
          project = _context5.v;
          if (project) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, res.status(404).json({
            message: "The project does not exist"
          }));
        case 2:
          if (!(!name.trim() || name.length < 3 || name.length > 100)) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, res.status(400).json({
            message: "The task name must be between 3 and 100 characters."
          }));
        case 3:
          task = {
            id: Date.now().toString(),
            name: name,
            description: description,
            assigned: assigned,
            startDate: startDate,
            endDate: endDate,
            status: status || "pending"
          };
          project.tasks.push(task);
          _context5.n = 4;
          return project.save();
        case 4:
          res.status(201).json(task);
          _context5.n = 6;
          break;
        case 5:
          _context5.p = 5;
          _t5 = _context5.v;
          res.status(400).json({
            message: _t5.message
          });
        case 6:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 5]]);
  }));
  return function addTaskToProject(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

// 🟢 حذف مهمة من مشروع معين
var deleteTaskFromProject = exports.deleteTaskFromProject = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var project, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return _Project["default"].findOne({
            id: req.params.id
          });
        case 1:
          project = _context6.v;
          if (project) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, res.status(404).json({
            message: "The project does not exist"
          }));
        case 2:
          project.tasks = project.tasks.filter(function (task) {
            return task.id !== req.params.taskId;
          });
          _context6.n = 3;
          return project.save();
        case 3:
          res.json({
            message: "The task has been deleted successfully"
          });
          _context6.n = 5;
          break;
        case 4:
          _context6.p = 4;
          _t6 = _context6.v;
          res.status(500).json({
            message: _t6.message
          });
        case 5:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 4]]);
  }));
  return function deleteTaskFromProject(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

// 🟢 تحديث مهمة داخل مشروع
var updateTaskInProject = exports.updateTaskInProject = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var project, task, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return _Project["default"].findOne({
            id: req.params.id
          });
        case 1:
          project = _context7.v;
          if (project) {
            _context7.n = 2;
            break;
          }
          return _context7.a(2, res.status(404).json({
            message: "The project does not exist"
          }));
        case 2:
          task = project.tasks.find(function (task) {
            return task.id === req.params.taskId;
          });
          if (task) {
            _context7.n = 3;
            break;
          }
          return _context7.a(2, res.status(404).json({
            message: "The task does not exist"
          }));
        case 3:
          Object.assign(task, req.body);
          _context7.n = 4;
          return project.save();
        case 4:
          res.json(task);
          _context7.n = 6;
          break;
        case 5:
          _context7.p = 5;
          _t7 = _context7.v;
          res.status(400).json({
            message: _t7.message
          });
        case 6:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 5]]);
  }));
  return function updateTaskInProject(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();