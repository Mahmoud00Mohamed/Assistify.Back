//  controllers/taskController.js
import Task from "../models/Task.js";
export const createTask = async (req, res) => {
  try {
    const { name, description, dueDate, tags } = req.body;
    const { userId } = req.user;

    // Validate the name
    if (!name?.trim() || name.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "❌ Task name is required (at least 3 characters)." });
    }

    // Check for an existing task with the same name
    const existingTask = await Task.findOne({ user: userId, name });
    if (existingTask) {
      return res
        .status(409)
        .json({ message: "⚠️ A task with the same name already exists." });
    }

    // Validate the due date
    const parsedDueDate = dueDate ? new Date(dueDate) : undefined;
    if (parsedDueDate && isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ message: "❌ Invalid due date." });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsedDueDate && parsedDueDate < today) {
      return res
        .status(400)
        .json({ message: "⚠️ You cannot set a due date in the past." });
    }

    // Check for duplicate tags
    if (tags && Array.isArray(tags)) {
      const uniqueTags = new Set(tags.map((tag) => tag.trim().toLowerCase()));
      if (uniqueTags.size !== tags.length) {
        return res.status(400).json({
          message: "⚠️ Cannot add tags with duplicate names.",
        });
      }
    }

    // Create the task
    const task = new Task({
      user: userId,
      name: name.trim(),
      description: description?.trim() || "",
      dueDate: parsedDueDate,
      tags: Array.isArray(tags) ? tags.map((t) => t.trim()) : [],
      tagsStatus: Array.isArray(tags) ? new Array(tags.length).fill(false) : [],
      progress: 0,
    });

    await task.save();
    res.status(201).json({ message: "✅ Task added successfully.", task });
  } catch (error) {
    console.error("❌ Error while creating the task:", error.message);
    res
      .status(500)
      .json({ message: "❌ An error occurred while creating the task." });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { search, completed, page = 1, limit = 100 } = req.query;
    const { userId } = req.user;

    const query = { user: userId };

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    const pageNumber = Math.max(parseInt(page, 10), 1); // لا تقل عن 1
    const pageSize = Math.max(parseInt(limit, 10), 1); // لا تقل عن 1

    const skip = (pageNumber - 1) * pageSize;

    const [tasks, totalTasks] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize),
      Task.countDocuments(query),
    ]);

    res.status(200).json({
      page: pageNumber,
      pageSize,
      totalTasks,
      totalPages: Math.ceil(totalTasks / pageSize),
      tasks,
    });
  } catch (error) {
    console.error("❌ Error while fetching tasks:", error.message);
    res
      .status(500)
      .json({ message: "❌ An error occurred while fetching tasks." });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.user;
    const {
      name,
      description,
      progress,
      dueDate,
      tags,
      completed,
      tagsStatus,
    } = req.body;

    // Validate the task ID
    if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "❌ Invalid task ID." });
    }

    // Find the task
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ message: "⚠️ The task does not exist." });
    }

    // Check for duplicate name if it’s changed
    if (name && name !== task.name) {
      const duplicateTask = await Task.findOne({ user: userId, name });
      if (duplicateTask) {
        return res
          .status(409)
          .json({ message: "⚠️ A task with the same name already exists." });
      }
    }

    // Validate progress percentage
    if (progress !== undefined && (progress < 0 || progress > 100)) {
      return res
        .status(400)
        .json({ message: "❌ Progress percentage must be between 0 and 100." });
    }

    // Validate due date
    if (dueDate) {
      const parsedDueDate = new Date(dueDate);
      if (isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({ message: "❌ Invalid due date." });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (parsedDueDate < today) {
        return res.status(400).json({
          message: "⚠️ You cannot set the task due date to a past date.",
        });
      }

      task.dueDate = parsedDueDate;
    }

    // Check for duplicate tags
    if (tags && Array.isArray(tags)) {
      const uniqueTags = new Set(tags.map((tag) => tag.trim().toLowerCase()));
      if (uniqueTags.size !== tags.length) {
        return res.status(400).json({
          message: "⚠️ You cannot update the task with duplicate tags.",
        });
      }

      task.tags = tags.map((tag) => tag.trim());

      // Reset tagsStatus while preserving old values
      task.tagsStatus = task.tags.map((_, index) => {
        return tagsStatus && index < tagsStatus.length
          ? tagsStatus[index]
          : false;
      });
    }

    if (tagsStatus && Array.isArray(tagsStatus)) {
      task.tagsStatus = task.tags.map((_, index) => {
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

    await task.save();
    res.status(200).json({ message: "✅ Task updated successfully.", task });
  } catch (error) {
    console.error("❌ Error while updating the task:", error.message);
    res
      .status(500)
      .json({ message: "❌ An error occurred while updating the task." });
  }
};

// حذف مهمة
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.user;

    if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "❌ Invalid task ID." });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!task) {
      return res
        .status(404)
        .json({
          message:
            "⚠️ The task does not exist or you are not authorized to delete it.",
        });
    }

    res.status(200).json({ message: "✅ Task deleted successfully." });
  } catch (error) {
    console.error("❌ Error while deleting the task:", error.message);
    res
      .status(500)
      .json({ message: "❌ An error occurred while deleting the task." });
  }
};
