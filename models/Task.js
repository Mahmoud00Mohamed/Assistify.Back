// models / Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 10000,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    tags: {
      type: [String],
      default: [],
    },
    tagsStatus: {
      type: [Boolean],
      default: [],
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true, versionKey: false } //  تعطيل __v
);

export default mongoose.model("Task", taskSchema);
