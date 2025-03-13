// controllers/projectController.js
import Project from "../models/Project.js";

// 🟢 جلب جميع المشاريع
export const getAllProjects = async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await Project.find({ user: userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 إضافة مشروع جديد
export const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;
    const userId = req.user.userId;

    if (!name.trim())
      return res.status(400).json({ message: "The project name is required." });
    const newProject = new Project({
      id: Date.now().toString(),
      name,
      description,
      startDate,
      endDate,
      status: status || "pending",
      tasks: [],
      user: userId,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🟢 تحديث مشروع
export const updateProject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const project = await Project.findOne({ id: req.params.id, user: userId });
    if (!project)
      return res.status(404).json({ message: "The project does not exist" });
    Object.assign(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🟢 حذف مشروع
export const deleteProject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const project = await Project.findOneAndDelete({
      id: req.params.id,
      user: userId,
    });
    if (!project)
      return res.status(404).json({ message: "The project does not exist" });
    res.json({ message: "The project has been deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 إضافة مهمة إلى مشروع معين
export const addTaskToProject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, description, assigned, startDate, endDate, status } =
      req.body;
    const project = await Project.findOne({ id: req.params.id, user: userId });

    if (!project)
      return res.status(404).json({ message: "The project does not exist" });
    if (!name.trim() || name.length < 3 || name.length > 100)
      return res.status(400).json({
        message: "The task name must be between 3 and 100 characters.",
      });
    const task = {
      id: Date.now().toString(),
      name,
      description,
      assigned,
      startDate,
      endDate,
      status: status || "pending",
    };

    project.tasks.push(task);
    await project.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🟢 حذف مهمة من مشروع معين
export const deleteTaskFromProject = async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (!project)
      return res.status(404).json({ message: "The project does not exist" });
    project.tasks = project.tasks.filter(
      (task) => task.id !== req.params.taskId
    );
    await project.save();
    res.json({ message: "The task has been deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 تحديث مهمة داخل مشروع
export const updateTaskInProject = async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (!project)
      return res.status(404).json({ message: "The project does not exist" });
    const task = project.tasks.find((task) => task.id === req.params.taskId);
    if (!task)
      return res.status(404).json({ message: "The task does not exist" });
    Object.assign(task, req.body);
    await project.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
