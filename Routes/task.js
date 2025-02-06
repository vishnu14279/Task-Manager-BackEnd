const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../Controller/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/",  getTasks);
router.put("/updateTask/:id",  updateTask);
router.delete("/deleteTask/:id", deleteTask);

module.exports = router;
