const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "To Do" },
  createdBy: { type: mongoose.Schema.Types.ObjectId,  ref: "User"},
});


const Task = mongoose.model('Task', TaskSchema, 'task');

module.exports = Task;
