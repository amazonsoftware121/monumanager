const db = require("../connect.js");

const addTask = (req, res) =>{
    const q = "INSERT INTO task (`job_id`, `description`, `creation_time`, `due_date`, `notes`) VALUE (?)";

    const values = [
        req.params.orderid,    
        req.body.task_description,
        req.body.task_creation_date,
        req.body.task_due_date,
        req.body.task_notes
    ];

    db.query(q, [values] , (err, data) =>{
        if(err) return res.status(500).json(err);
            const lastInsertId = data.insertId;
            return res.status(200).json([{"successmsg": "Task has been Created", "lastInserId": lastInsertId }]);        
    });
}

const addTaskCustomer = (req, res) => {
    const customer_id = req.params.customerId;
    const tasks = req.body.selectedTasks;
  
    // Check if tasks is an array and not empty
    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ errorMsg: "Invalid or empty tasks array" });
    }
  
    const insertTasksQuery = "INSERT INTO customer_tasks (customer_id, task_id) VALUES ?";
    const taskValues = tasks.map(taskId => [customer_id, taskId]);
  
    // Check if the combination of customer_id and taskId already exists
    const checkExistenceQuery = "SELECT * FROM customer_tasks WHERE customer_id = ? AND task_id IN (?)";
  
    db.query(checkExistenceQuery, [customer_id, tasks], (checkErr, checkResult) => {
      if (checkErr) {
        console.error(checkErr);
        return res.status(500).json({ errorMsg: "Error checking task existence" });
      }
  
      if (checkResult.length > 0) {
        // Tasks already exist for this customer
        return res.status(200).json({ errorMsg: "Tasks already added for this customer" });
      }
  
      // If not exists, proceed with the insertion
      db.query(insertTasksQuery, [taskValues], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ errorMsg: "Error inserting tasks" });
        }
  
        const lastInsertId = result.insertId;
        return res.status(200).json({ successMsg: "Tasks have been added", lastInsertId });
      });
    });
  };
  
      

const editTask = (req, res) => {
    const taskId = req.params.taskId; // Assuming taskId is the unique identifier for the task
    const q = "UPDATE task SET `description` = ?, `creation_time` = ?, `due_date` = ?, `notes` = ? WHERE `id` = ?";

    const values = [
        req.body.task_description,
        req.body.task_creation_date,
        req.body.task_due_date,
        req.body.task_notes,
        taskId // Use taskId to identify the task to update
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json([{"successmsg": "Task has been updated", "taskId": taskId }]);
    });
}





const getTasks = (req, res) =>{
    const q = `SELECT * FROM task ORDER BY id DESC`;
    db.query(q,(err, data) =>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);

    })
}

const getJobTasks = (req, res) =>{
    const orderid = req.params.orderid;
    const q = `SELECT * FROM task WHERE job_id = ?`;
    db.query(q, orderid, (err, data) =>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);

    })
}

const getTask = (req, res) => {
const taskid = req.params.taskid;
const q = `SELECT * FROM task WHERE id = ?`
db.query(q,taskid,(err,data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
})
}

const deleteTask = (req, res) =>{
const taskId = req.params.id;
const q = "DELETE FROM task WHERE id = ?"
db.query(q, [taskId], (err,data)=>{
    if (err) res.status(500).json(err);
    return res.json("Task Deleted successfully.");
})
}

module.exports = {addTask,getTasks, deleteTask, getJobTasks,getTask,editTask,addTaskCustomer};