const express = require("express");

const { addTask,getTasks, deleteTask,getJobTasks, getTask } = require("../controllers/task.js");

const router = express.Router();

router.post("/addtask/:orderid", addTask);
router.get("/gettasks", getTasks);
router.get("/gettask/:taskid", getTask);
router.get("/getjobtasks/:orderid", getJobTasks);
router.delete("/deletetask/:id", deleteTask)
module.exports = router;