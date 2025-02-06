const Task = require("../Model/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, createdBy } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ error: "Title and Due Date are required." });
    }

    const newTask = new Task({ title, description, dueDate, status, createdBy });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

const getTasks = async (req, res) => {
  try {
    const { status, dueDate, sortOrder = "asc" } = req.query;

    let filter = {};

    //  status filter
    if (status) {
      filter.status = status;
    }

    //  dueDate filter 
    if (dueDate) {
      const date = new Date(dueDate);
      filter.dueDate = { $gte: date };
    }

    const tasks = await Task.find(filter).sort({ dueDate: sortOrder === "asc" ? 1 : -1 }).populate("createdBy", "username")

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { title, description, dueDate, status, createdBy } = req.body;

    const task = await Task.findByIdAndUpdate(taskId, { title, description, dueDate, status, createdBy }, { new: true });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
