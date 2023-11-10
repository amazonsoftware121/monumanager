const express = require("express");

const { addTask,getTasks, deleteTask,getJobTasks, getTask,editTask,addTaskCustomer } = require("../controllers/task.js");

const router = express.Router();

router.post("/addtask/:orderid", addTask);
router.post("/addtaskcustomer/:customerId", addTaskCustomer);
router.post("/addtask", addTask);
router.get("/gettasks", getTasks);
router.get("/gettask/:taskid", getTask);
router.get("/getjobtasks/:orderid", getJobTasks);
router.delete("/deletetask/:id", deleteTask)
router.put("/edittask/:taskId", editTask)
module.exports = router;