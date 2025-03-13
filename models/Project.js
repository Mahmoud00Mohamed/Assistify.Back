// models / Project.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  assigned: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: [
      "pending",
      "in-progress",
      "completed",
      "on-hold",
      "cancelled",
      "overdue",
      "not-started",
    ],
    default: "pending",
  },
});

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: [
      "pending",
      "in-progress",
      "completed",
      "on-hold",
      "cancelled",
      "overdue",
      "not-started",
    ],
    default: "pending",
  },
  tasks: [taskSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ربط المشروع بالمستخدم
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
