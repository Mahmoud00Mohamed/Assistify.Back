"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTask = exports.getUserTasks = exports.deleteTask = exports.createTask = void 0;
var _Task = _interopRequireDefault(require("../models/Task.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } //  controllers/taskController.js
var createTask = exports.createTask = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, name, description, dueDate, tags, userId, existingTask, parsedDueDate, today, uniqueTags, task, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, name = _req$body.name, description = _req$body.description, dueDate = _req$body.dueDate, tags = _req$body.tags;
          userId = req.user.userId; // Validate the name
          if (!(!(name !== null && name !== void 0 && name.trim()) || name.trim().length < 3)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: " Task name is required (at least 3 characters)."
          }));
        case 1:
          _context.n = 2;
          return _Task["default"].findOne({
            user: userId,
            name: name
          });
        case 2:
          existingTask = _context.v;
          if (!existingTask) {
            _context.n = 3;
            break;
          }
          return _context.a(2, res.status(409).json({
            message: "⚠️ A task with the same name already exists."
          }));
        case 3:
          // Validate the due date
          parsedDueDate = dueDate ? new Date(dueDate) : undefined;
          if (!(parsedDueDate && isNaN(parsedDueDate.getTime()))) {
            _context.n = 4;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: " Invalid due date."
          }));
        case 4:
          today = new Date();
          today.setHours(0, 0, 0, 0);
          if (!(parsedDueDate && parsedDueDate < today)) {
            _context.n = 5;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "⚠️ You cannot set a due date in the past."
          }));
        case 5:
          if (!(tags && Array.isArray(tags))) {
            _context.n = 6;
            break;
          }
          uniqueTags = new Set(tags.map(function (tag) {
            return tag.trim().toLowerCase();
          }));
          if (!(uniqueTags.size !== tags.length)) {
            _context.n = 6;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "⚠️ Cannot add tags with duplicate names."
          }));
        case 6:
          // Create the task
          task = new _Task["default"]({
            user: userId,
            name: name.trim(),
            description: (description === null || description === void 0 ? void 0 : description.trim()) || "",
            dueDate: parsedDueDate,
            tags: Array.isArray(tags) ? tags.map(function (t) {
              return t.trim();
            }) : [],
            tagsStatus: Array.isArray(tags) ? new Array(tags.length).fill(false) : [],
            progress: 0
          });
          _context.n = 7;
          return task.save();
        case 7:
          res.status(201).json({
            message: " Task added successfully.",
            task: task
          });
          _context.n = 9;
          break;
        case 8:
          _context.p = 8;
          _t = _context.v;
          res.status(500).json({
            message: " An error occurred while creating the task."
          });
        case 9:
          return _context.a(2);
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function createTask(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getUserTasks = exports.getUserTasks = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$query, search, completed, _req$query$page, page, _req$query$limit, limit, userId, query, pageNumber, pageSize, skip, _yield$Promise$all, _yield$Promise$all2, tasks, totalTasks, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _req$query = req.query, search = _req$query.search, completed = _req$query.completed, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 100 : _req$query$limit;
          userId = req.user.userId;
          query = {
            user: userId
          };
          if (search) {
            query.$or = [{
              name: new RegExp(search, "i")
            }, {
              tags: {
                $in: [new RegExp(search, "i")]
              }
            }];
          }
          if (completed !== undefined) {
            query.completed = completed === "true";
          }
          pageNumber = Math.max(parseInt(page, 10), 1); // لا تقل عن 1
          pageSize = Math.max(parseInt(limit, 10), 1); // لا تقل عن 1
          skip = (pageNumber - 1) * pageSize;
          _context2.n = 1;
          return Promise.all([_Task["default"].find(query).sort({
            createdAt: -1
          }).skip(skip).limit(pageSize), _Task["default"].countDocuments(query)]);
        case 1:
          _yield$Promise$all = _context2.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          tasks = _yield$Promise$all2[0];
          totalTasks = _yield$Promise$all2[1];
          res.status(200).json({
            page: pageNumber,
            pageSize: pageSize,
            totalTasks: totalTasks,
            totalPages: Math.ceil(totalTasks / pageSize),
            tasks: tasks
          });
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t2 = _context2.v;
          res.status(500).json({
            message: " An error occurred while fetching tasks."
          });
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function getUserTasks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var updateTask = exports.updateTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var taskId, userId, _req$body2, name, description, progress, dueDate, tags, completed, tagsStatus, task, duplicateTask, parsedDueDate, today, uniqueTags, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          taskId = req.params.taskId;
          userId = req.user.userId;
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, progress = _req$body2.progress, dueDate = _req$body2.dueDate, tags = _req$body2.tags, completed = _req$body2.completed, tagsStatus = _req$body2.tagsStatus; // Validate the task ID
          if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: " Invalid task ID."
          }));
        case 1:
          _context3.n = 2;
          return _Task["default"].findOne({
            _id: taskId,
            user: userId
          });
        case 2:
          task = _context3.v;
          if (task) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: "⚠️ The task does not exist."
          }));
        case 3:
          if (!(name && name !== task.name)) {
            _context3.n = 5;
            break;
          }
          _context3.n = 4;
          return _Task["default"].findOne({
            user: userId,
            name: name
          });
        case 4:
          duplicateTask = _context3.v;
          if (!duplicateTask) {
            _context3.n = 5;
            break;
          }
          return _context3.a(2, res.status(409).json({
            message: "⚠️ A task with the same name already exists."
          }));
        case 5:
          if (!(progress !== undefined && (progress < 0 || progress > 100))) {
            _context3.n = 6;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: " Progress percentage must be between 0 and 100."
          }));
        case 6:
          if (!dueDate) {
            _context3.n = 9;
            break;
          }
          parsedDueDate = new Date(dueDate);
          if (!isNaN(parsedDueDate.getTime())) {
            _context3.n = 7;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: " Invalid due date."
          }));
        case 7:
          today = new Date();
          today.setHours(0, 0, 0, 0);
          if (!(parsedDueDate < today)) {
            _context3.n = 8;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: "⚠️ You cannot set the task due date to a past date."
          }));
        case 8:
          task.dueDate = parsedDueDate;
        case 9:
          if (!(tags && Array.isArray(tags))) {
            _context3.n = 11;
            break;
          }
          uniqueTags = new Set(tags.map(function (tag) {
            return tag.trim().toLowerCase();
          }));
          if (!(uniqueTags.size !== tags.length)) {
            _context3.n = 10;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: "⚠️ You cannot update the task with duplicate tags."
          }));
        case 10:
          task.tags = tags.map(function (tag) {
            return tag.trim();
          });

          // Reset tagsStatus while preserving old values
          task.tagsStatus = task.tags.map(function (_, index) {
            return tagsStatus && index < tagsStatus.length ? tagsStatus[index] : false;
          });
        case 11:
          if (tagsStatus && Array.isArray(tagsStatus)) {
            task.tagsStatus = task.tags.map(function (_, index) {
              return tagsStatus[index] !== undefined ? tagsStatus[index] : false;
            });
          } else {
            task.tagsStatus = new Array(task.tags.length).fill(false); // Reset all to false if tagsStatus isn’t provided
          }

          // Update the remaining fields
          if (name) task.name = name.trim();
          if (description !== undefined) task.description = description.trim();
          if (progress !== undefined) task.progress = progress;
          if (completed !== undefined) task.completed = completed;
          _context3.n = 12;
          return task.save();
        case 12:
          res.status(200).json({
            message: " Task updated successfully.",
            task: task
          });
          _context3.n = 14;
          break;
        case 13:
          _context3.p = 13;
          _t3 = _context3.v;
          res.status(500).json({
            message: " An error occurred while updating the task."
          });
        case 14:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function updateTask(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// حذف مهمة
var deleteTask = exports.deleteTask = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var taskId, userId, task, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          taskId = req.params.taskId;
          userId = req.user.userId;
          if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, res.status(400).json({
            message: " Invalid task ID."
          }));
        case 1:
          _context4.n = 2;
          return _Task["default"].findOneAndDelete({
            _id: taskId,
            user: userId
          });
        case 2:
          task = _context4.v;
          if (task) {
            _context4.n = 3;
            break;
          }
          return _context4.a(2, res.status(404).json({
            message: "⚠️ The task does not exist or you are not authorized to delete it."
          }));
        case 3:
          res.status(200).json({
            message: " Task deleted successfully."
          });
          _context4.n = 5;
          break;
        case 4:
          _context4.p = 4;
          _t4 = _context4.v;
          res.status(500).json({
            message: " An error occurred while deleting the task."
          });
        case 5:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 4]]);
  }));
  return function deleteTask(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();